export interface GetTranslateResultReq {
    apiKey: string;
    content: {
        emotion: string;
        style: string;
        preTranslate: string;
    },
    from: string,
    to: string
}