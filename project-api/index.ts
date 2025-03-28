import express from "express";
import cors from "cors";
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use('/messages', messagesRouter);

const run = async () => {
    await fileDb.init()

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })

}

run().catch(console.error);