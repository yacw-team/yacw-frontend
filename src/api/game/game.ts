import type { selectStory, sendChoice } from "./req"
import type { getNewChoiceAndStory, getAllStory } from "./res"

import axios from "axios";

const URL = {
    SelectStory: "/api/v1/game/new",
    GetAllStories: "/api/v1/game/story",
    SendChoice: "/api/v1/game/chat",
}


export async function Getallstory(): Promise<getAllStory[]> {
    try {
        const response = await axios.get(URL.GetAllStories);
        const resData: getAllStory[] = response.data;
        return resData;
    }
    catch (error) {
        return [
            {
                GameId: "1",
                Name: "岳阳楼记",
                Description:
                    "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。(具 通：俱)" +
                    "予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？",
            },
            {
                GameId: "1",
                Name: "故事的名字2",
                Description: "乱写的故事描述2,这个也不短",
            },
        ]
    }
}
export async function Selectstory(req: selectStory): Promise<getNewChoiceAndStory> {
    try {
        const response = await axios.post(URL.SelectStory, req);
        const resData: getNewChoiceAndStory = response.data;
        return resData;
    }
    catch (error) {
        console.log("11");
        return {
            story: "游戏结束了或因为网络问题而终止",//故事的发展剧情
            choice: [],
            round: -1,
        };
    }
}

export async function sendchoice(req: sendChoice):Promise<getNewChoiceAndStory> {
    try{
        const response = await axios.post(URL.SendChoice,req);
        const resData: getNewChoiceAndStory = response.data;
        return resData;
    }catch (error) {
        // 处理错误
        return {
            story: "游戏结束了或因为网络问题而终止",//故事的发展剧情
            choice: [],
            round: -1,
        };
      }
   
} 
