import axios from "axios";

import type { GetTranslateResultReq } from "./req";
import type { GetTranslateResultRes } from "./res";

const URL = {
  TRANSLATE: "/api/v1/translate/translate",
};

export async function getTranslateResult(
  reqData: GetTranslateResultReq
): Promise<GetTranslateResultRes> {
  let res: GetTranslateResultRes = {
    content: {
      emotion: "",
      style: "",
      preTranslate: "",
      translated: ""
    },
    from: "",
    to: "",
  };
  axios
    .post(URL.TRANSLATE, reqData)
    .then((response) => {
      res = response.data;
      console.log(res.content.translated)
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}
