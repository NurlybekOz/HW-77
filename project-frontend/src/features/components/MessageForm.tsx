import {useState} from "react";
import {MessageMutation} from "../../types";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {createMessage, fetchAllMessages} from "../Messages/MessagesThunk.ts";
import {toast} from "react-toastify";

const initialState: MessageMutation = {
    author: '', image: '', message: ''
}

const MessageForm = () => {
    const [form, setForm] = useState<MessageMutation>(initialState)
    const dispatch = useAppDispatch()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.message.trim()) {
            toast.error('Message cannot be empty')
        }
        await dispatch(createMessage(form)).unwrap();
        setForm(initialState)

        await dispatch(fetchAllMessages())
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target

        if (files) {
            setForm(prevState => ({...prevState, [name]: files[0]}))
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ width: "30%", margin: "0 auto 25px"}}>
            <Grid container spacing={2} direction="column">
                <Grid size={12}>
                    <TextField
                    label="Author"
                    value={form.author}
                    onChange={onInputChange}
                    name="author"
                    id="author"
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Message"
                        value={form.message}
                        onChange={onInputChange}
                        name="message"
                        id="message"
                    />
                </Grid>
                <Grid size={12}>
                   <FileInput onChange={fileInputChangeHandler} name='image' label='Image'/>
                </Grid>
                <Grid size={12}>
                    <Button style={{width: '100%'}} variant="contained" type="submit" >Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MessageForm;