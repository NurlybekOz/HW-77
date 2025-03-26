import {promises as fs} from 'fs';

import {existsSync} from "node:fs";
import * as crypto from "node:crypto";
import {MessageUser, MessageWithoutId} from "./types";

const filename = './db.json';
let data: MessageUser[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                return fs.writeFile(filename, JSON.stringify([]));

            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as MessageUser[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },
    async getAllMessages() {
        return data;
    },
    async addNewMessage(messageToAdd: MessageWithoutId) {
        const newMessage = {id: crypto.randomUUID(), ...messageToAdd};
        data.push(newMessage)
        await this.save();
        return newMessage;
    },
    async save () {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};
export default fileDb;
