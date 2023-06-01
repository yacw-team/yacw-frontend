import axios from "axios";

import type { checkAPIKeyReq } from "./req";
import { ca } from "element-plus/es/locale";

const URLs = {
    CheckAPIKey: "/api/v1/chat/apiKey",
};

export async function checkAPIKey(APIKey: string): Promise<string> {
    const req: checkAPIKeyReq = {
        apiKey: APIKey,
    };
    try{
        const response=await axios.post(URLs.CheckAPIKey, req);
        
        return "200";

    }catch(error){
        return "";

    }
   
}