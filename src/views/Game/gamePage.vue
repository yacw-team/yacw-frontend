<template>
  <div class="whole_container">
    <TopBar />
    <div class="flex flex-col">
      <img src="/Image/prison.png" class="w-full flex-1" />
      <div v-if="!start" class="w-full py-10 flex-1">
        <div class="container w-4/5">
          <div class="card" v-for="(s, index) in all.story" :key="index" :title="s.Name" :name="index">
            <img src="/Image/prisonwindow.png" />
            <div class="w-full">
              <h2 class="font-bold text-xl my-2 ml-1 dark:text-black">&emsp;{{ s.Name }}</h2>
              <div class="ml-10 dark:text-black">{{ s.Description }}</div>
              <div style="display:flex;justify-content:flex-end;align-items:flex-end; ">
                <el-button class="playButton mr-4 dark:text-black" @click="playGame(s)">开始游玩</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="start && isLoading">
        <Loading />
      </div>
      <div v-else class="w-full py-10">
        <Book style="justify-self: center; width: 80%;" :Name="getOneStory?.Name" :GameId="getOneStory?.GameId"
          :Description="getOneStory?.Description" :Choice="myObject.choice" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, watch, type Ref } from "vue";
import TopBar from "./components/TopBarMenu.vue";
import Book from "./bookTest.vue";
import Loading from "@/views/Game/components/Loading.vue";
import { db } from "@/database/db";
import type { selectStory } from "@/api/game/req";
import type { getAllStory, getNewChoiceAndStory } from "@/api/game/res";
import { Selectstory, Getallstory } from "@/api/game/game"

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
      const get: getNewChoiceAndStory = await Selectstory(selectstory);
      myObject.choice = get.choice;
      console.log(get.choice, myObject.choice)
      console.log("22");
      isLoading.value = false;
      console.log(isLoading.value)
    }
  } finally {
    isLoading.value = false;
    db.close();
  }
  isLoading.value = false;
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
  all.value.story = await Getallstory();
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
  justify-content: center;
  /* 水平居中 */
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
