export interface getNewChoiceAndStory {
    story: string,//故事的发展剧情
    choice: Array<{ [key: string]: string }>,
    round: number,
}

export interface getAllStory{
    GameId:string,
    Name:string,
    Description:string,
}