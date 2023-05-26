export interface firstSendMessage{
    apiKey: string,
    modelId: string,
    chatId: string,
    content: {
      personalityId: string, //构造system
      user: string, // user input
    },
}

export interface sendMessage{
    apiKey: string,
    chatId: string,
    content: {
      user: string,
    },
}

export interface deleteChat{
    apiKey:string,
    chatId:string,
}