
import type { getFirstMessage, getMessage } from "./res"
import type { sendMessage, firstSendMessage, deleteChat } from "./req"
import axios from "axios";

const URL = {
    FIRSTCHAT: "/api/v1/chat/new",
    CHAT: "/api/v1/chat/chat",
    DELETE: "/api/v1/chat/deletechat"
}

export async function getFirst(req: firstSendMessage): Promise<getFirstMessage> {
    try {
        const response = await axios.post(URL.FIRSTCHAT, req)
        const resData: getFirstMessage = response.data;
        return resData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }

}
export async function getmessage(req: sendMessage): Promise<getMessage> {
    try {
        const response = await axios.post(URL.CHAT, req)
        const resData: getMessage = response.data;
        return resData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }
}
export async function deletemessage(req: deleteChat) {
    try {
        await axios.post(URL.DELETE, req)


    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete message');
    }
}

