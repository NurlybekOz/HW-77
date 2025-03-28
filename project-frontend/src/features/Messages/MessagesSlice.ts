import {IMessages} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createMessage, fetchAllMessages} from "./MessagesThunk.ts";
import {RootState} from "../../app/store.ts";

interface IMessagesState {
    items: IMessages[];
    loading: boolean;
}

const initialState: IMessagesState = {
    items: [],
    loading: false,
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, (state) => {
                 state.loading = true
            })
            .addCase(fetchAllMessages.fulfilled, (state, {payload: messages}) => {
                state.items = messages
                state.loading = false
            })
            .addCase(fetchAllMessages.rejected, (state) => {
                state.loading = false
            })

            .addCase(createMessage.pending, (state) => {
                state.loading = false
            })
            .addCase(createMessage.fulfilled, (state) => {
            state.loading = false
            })
            .addCase(createMessage.rejected, (state) => {
                state.loading = false
            })
    }
})

export const messagesReducer = messagesSlice.reducer;
export const selectMessages = (state: RootState) => state.messages.items;
export const selectLoading = (state: RootState) => state.messages.loading;