import {IMessages, MessageMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

export const fetchAllMessages = createAsyncThunk<IMessages[], void>(
    'messages/fetchAllMessages',
    async () => {
        const response = await axiosApi.get<IMessages[]>('/messages');
        return response.data;
    }
)
export const createMessage = createAsyncThunk<void, MessageMutation>(
    'messages/createMessage',
    async (messageToAdd) => {
        const formData = new FormData();
        formData.append("author", messageToAdd.author);
        formData.append("message", messageToAdd.message);
        if (messageToAdd.image) {
            formData.append("image", messageToAdd.image);
        }
        await axiosApi.post<MessageMutation>('/messages', formData)
    }
)