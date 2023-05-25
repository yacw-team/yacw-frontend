
import type { getFirstMessage, getMessage } from "./res"
import type { sendMessage, firstSendMessage } from "./req"
import axios from "axios";

const URL = {
    FIRSTCHAT: "/api/v1/chat/new",
    CHAT: "/api/v1/chat/chat"
}

export async function getFirst(req: sendMessage): Promise<getFirstMessage> {
    return axios.post(URL.FIRSTCHAT, req)
        .then((response) => {
            const resData: getFirstMessage = response.data;

            return resData;
        });

}

