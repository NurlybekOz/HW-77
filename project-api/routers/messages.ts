import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";
import {imagesUpload} from "../multer";
const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const Messages = await fileDb.getAllMessages();
    res.send(Messages);
})

messagesRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({error: "Message cannot be empty"});
        return;
    }

    const NewMessage: MessageWithoutId = {
        author: req.body.author ? req.body.author : 'Anonymous',
        message: req.body.message,
        image: req.file ? 'images/' + req.file.filename : null,
    }
    const SendNewMessage = await fileDb.addNewMessage(NewMessage);
    res.send(SendNewMessage);
})

export default messagesRouter;