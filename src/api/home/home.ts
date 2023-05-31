import axios from "axios";

import type { checkAPIKeyReq } from "./req";

const URLs = {
    CheckAPIKey: "/api/v1/chat/apiKey",
};

export async function checkAPIKey(APIKey: string): Promise<string> {
    const req: checkAPIKeyReq = {
        apiKey: APIKey,
    };
    axios
        .post(URLs.CheckAPIKey, req)
        .then(async (response) => {
            return response.data.status;
        })
        .catch((error) => {
            console.log(error);
        })
    return "";
}