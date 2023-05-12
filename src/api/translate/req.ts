export interface GetTranslateResultReq {
    apiKey: string;
    modelId:string;
    content: {
        emotion: string;
        style: string;
        preTranslate: string;
    },
    from: string,
    to: string
}