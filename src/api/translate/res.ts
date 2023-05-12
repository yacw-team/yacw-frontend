export interface GetTranslateResultRes {
    content: {
        emotion: string;
        style: string;
        preTranslate: string;
        translated: string;
    },
    from: string,
    to: string,
}