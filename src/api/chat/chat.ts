
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
        console.log("network error")
        return {
            chatId: req.chatId,
            modelId: req.modelId,
            content: {
                personalityId: req.content.personalityId,
                user: req.content.user,      // user input
                assistant: '网络或者输入错误，请重新输入',
                title: '你好'+req.chatId,
            },
        }
    }

}
export async function getmessage(req: sendMessage): Promise<getMessage> {
    try {
        const response = await axios.post(URL.CHAT, req)
        const resData: getMessage = response.data;
        return resData;

    } catch (error) {
        return {
            chatId: req.chatId,
            content: {
                user: req.content.user,
                assistant: '网络或者输入错误，请重新输入',
            }
        }

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

