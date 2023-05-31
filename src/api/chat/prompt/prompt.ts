import type { sendNewPrompt } from "@/api/chat/prompt/req";
import type { Prompt } from "@/api/chat/prompt/res"
import axios from "axios"

const URL = {
    Getmyprompts: "/api/v1/chat/myprompts",
    Getprompts: "/api/v1/chat/prompts",
}

export async function getmyprompts(req: string): Promise<Prompt[]> {
    let resData: Prompt[] = [];
    try {
        const response = await axios.post(URL.Getmyprompts, req)

        resData = response.data.Prompts;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }
    return resData;
}

export async function getprompts(): Promise<Prompt[]> {
    let resData: Prompt[] = [];
    try {
        const response = await axios.get(URL.Getprompts)

        resData = response.data.Prompts;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }
    return resData;
}

export async function getPromptsByType(type: string) {
    let reqURL = "";
    if (type != null) {
        reqURL = URL.Getprompts + "?type=" + type;
    } else {
        reqURL = URL.Getprompts;
    }
    let resData: Prompt[] = [];
    try {
        const response = await axios.get(reqURL)
        resData = response.data.Prompts;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }
    return resData;
}

export async function getnewprompts(req: sendNewPrompt): Promise<Prompt> {
    let resData: Prompt;
    try {
        const response = await axios.post(URL.Getprompts, req)
        resData = response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get message');
    }
    return resData;
}

