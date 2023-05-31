<template>
  <div class="whole_container" style>
    <TopBar />
    <img src="public\Image\prison.png" style="width: 100%;" />

    <div v-if="!start" style="width: 100%; margin-top:10%">
      <div class="container">
        <div
          class="card"
          v-for="(s, index) in all.story"
          :key="index"
          :title="s.Name"
          :name="index"
        >
          <img src="public\Image\prisonwindow.png" />
          <div style="width: 100%;">
            <h2 class="name">&emsp;{{ s.Name }}</h2>
            <div class="content">&emsp;&emsp;{{ s.Description }}</div>
            <div style="display:flex;justify-content:flex-end;align-items:flex-end; ">
              <el-button class="playButton" @click="playGame(s)">开始游玩</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="start && isLoading">
      <Loading />
    </div>
    <div v-else style="width: 100%;">
      <Book
        style="justify-self: center; width: 80%;"
        :Name="getOneStory?.Name"
        :GameId="getOneStory?.GameId"
        :Description="getOneStory?.Description"
        :Choice="myObject.choice"
      />
    </div>
  </div>
</template>
  <script setup lang="ts">
import axios from "axios";
import { onMounted, ref, inject, watch, type Ref } from "vue";
import TopBar from "./components/TopBarMenu.vue";
import Book from "./bookTest.vue";
import Loading from "@/views/Game/components/Loading.vue";
import { db } from "@/database/db";
import type { selectStory } from "@/api/game/req";
import type { getAllStory, getNewChoiceAndStory } from "@/api/game/res";
import {Selectstory,Getallstory} from "@/api/game/game"

interface story {
  GameId: string;
  Name: string;
  Description: string;
}
interface MyInterface {
  choice: Array<{ [key: string]: string }>;
}
let myObject: MyInterface = {
  choice: [],
};
const all = ref({ story: [] as getAllStory[] });
const start = ref(false);
const shouldShowGlobalComponentd = inject(
  "shouldShowGlobalComponent"
) as Ref<boolean>;
//const selectStory = ref<story>();
const getOneStory = ref<getAllStory>();
const ApiKey = ref("");
const ModelId = ref("");
const isLoading = ref(false);

async function playGame(msg: getAllStory) {
  shouldShowGlobalComponentd.value = false;
  start.value = true;
  getOneStory.value = msg;
  console.log(getOneStory.value.Name);
  isLoading.value = true;
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      ApiKey.value = firtRecord.apikey as string;
      ModelId.value = firtRecord.model as string;
    }

    if (ApiKey.value != "" && ModelId.value != "") {
      const selectstory: selectStory = {
        apiKey: ApiKey.value,
        gameId: msg.GameId,
        modelId: ModelId.value,
      };
      const get :getNewChoiceAndStory =await Selectstory(selectstory);
      myObject.choice=get.choice;
      console.log(get.choice,myObject.choice)
      console.log("22");
      isLoading.value=false;
      console.log(isLoading.value)
    }
  } finally {
    isLoading.value=false;
    db.close();
  }
  isLoading.value=false;
}



watch(
  () => shouldShowGlobalComponentd.value,
  (newVal) => {
    if (shouldShowGlobalComponentd.value == true) {
      start.value = false;
    }
  }
);

onMounted(async () => {
  all.value.story= await Getallstory();
  // await axios
  //   .get("/api/v1/game/story")
  //   .then((response) => {
  //     all.value.story = response.data;
  //   })
  //   .catch(() => {
  //     all.value = {
  //       story: [
  //         {
  //           GameId: "1",
  //           Name: "岳阳楼记",
  //           Description:
  //             "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。(具 通：俱)" +
  //             "予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？",
  //         },
  //         {
  //           GameId: "1",
  //           Name: "故事的名字2",
  //           Description: "乱写的故事描述2,这个也不短",
  //         },
  //       ],
  //     };
  //   });
});
</script>
  
  <style>
TopBar {
  height: fit-content;
  width: 100%;
}
.whole_container {
  background-color: #1d1d1d;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.container {
  z-index: -1;
  top: 4px;
  right: 4px;
  bottom: 4px;
  left: 4px;
  border: 2px solid #897d67;
  margin-left: auto;
  margin-right: auto;
  max-width: 60rem;
  justify-content: center; /* 水平居中 */
}

.card {
  background-color: #ede3d2;
  box-shadow: 0 5px 5px 0 #91856e;
  border: 8px;
  margin: 8px;
  display: flex;
  flex-direction: row;
  padding: 8px;
}

.name {
  font-weight: bolder;
  font-size: larger;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.content {
  margin-left: 1em;
}

.playButton {
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 0;
}

img {
  height: 130px;
  width: 100px;
}

.left {
  background-color: #c7af86;
  box-shadow: 0 5px 5px 0 #91856e;
  width: 40%;
}

.right {
  background-color: #c7af86;
  box-shadow: 0 5px 5px 0 #91856e;
  width: 40%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.book {
  background-color: #ddcdb0;
  display: flex;
  flex-direction: row;
}

.chooise {
  margin: 10px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
}
</style>
