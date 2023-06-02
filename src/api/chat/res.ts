export interface getFirstMessage{
    chatId: string,
    modelId: string,
    content: {
        personalityId: string,
        user: string,      // user input
        assistant:string,
        title:string,
    },
}

export interface getMessage{
    
    chatId: string,

    content: {
        user: string,
        assistant: string,
    },

}