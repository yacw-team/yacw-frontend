export interface selectStory{
    apiKey: string,
    gameId: string,
    modelId: string,
}
export interface sendChoice{
    apiKey: string,
    choiceID: string,//A,B,C,D
    modelId: string,
}