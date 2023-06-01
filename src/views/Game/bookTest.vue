<template>
  <div class="notebook" @getStory="() => ElMessage.info('sss')">
    <div class="left-pane">
      <h2>{{ myData.Name }}</h2>
      <p>{{ currentStory.story }}</p>
      <button @click="() => { if (currentStoryIndex >= 1) currentStoryIndex-- }">上一页</button>
    </div>
    <div class="right-pane">
      <div v-if="currentStoryIndex == currentStoryIndex1" class="content">
        <div v-if="isloading">
          <el-skeleton :rows="5" animated />
        </div>
        <div v-else>
          <button
            v-for="(option, index) in currentStory.choice"
            :key="index"
            @click="selectOption(currentStoryIndex + 1, String.fromCharCode(index + 65), option[String.fromCharCode(index + 65)])"
          >{{ String.fromCharCode(index + 65) }}.{{ option[String.fromCharCode(index + 65)] }}</button>
        </div>
      </div>
      <div v-else class="content1">
        <div v-if="currentStoryIndex != 0">
          <h2>你的选择是</h2>
          <p>{{ selectChoice[currentStoryIndex] }}</p>
        </div>
        <div v-else>
          <h2>故事正在展开</h2>
          <p>接下来做出你的选择吧</p>
        </div>
        <button
          @click="() => { if (currentStoryIndex < currentStoryIndex1) currentStoryIndex++ }"
        >下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref, computed, onMounted, defineProps } from "vue";
import type { sendChoice } from "@/api/game/req";
import type { getNewChoiceAndStory, getAllStory } from "@/api/game/res";
import { sendchoice } from "@/api/game/game";
import { db } from "@/database/db";

// interface Story {
//   story: string;
//   choice: Array<{ [key: string]: string }>;
//   round: number;
// }

// interface selectStory {
//   GameId: string;
//   Name: string;
//   Description: string;
// }

const props = defineProps({
  GameId: String,
  Name: String,
  Description: String,

  apiKey: String,
  modelId: String,

  Choice: {
    type: Array as () => Array<{ [key: string]: string }>,
    required: true,
  },
});

const myData = ref<getAllStory>({
  GameId: props.GameId as string,
  Name: props.Name as string,
  Description: props.Description as string,
});
const isloading = ref(false);
const currentStoryIndex = ref(0);
const currentStoryIndex1 = ref(0);
const apiKey = ref("");
const currentStory = computed(() => stories.value[currentStoryIndex.value]);
const ModelId = ref("");
const selectChoice = ref<string[]>([""]);
const stories = ref<getNewChoiceAndStory[]>([
  {
    story: myData.value.Description,
    choice: [],
    round: 10,
  },
]);

async function selectOption(next: number, choice: string, content: string) {
  //应先让它加载
  isloading.value = true;
  console.log(currentStoryIndex.value, currentStoryIndex1.value);
  try {
    const sendachoice: sendChoice = {
      apiKey: apiKey.value,
      choiceID: choice, //A,B,C,D
      modelId: ModelId.value,
    };
    console.log(sendachoice);
    sendchoice(sendachoice)
      .then((responseData) => {
        const getnewchoice: getNewChoiceAndStory = responseData;
        stories.value.push(getnewchoice);
      })
      .finally(() => {
        isloading.value = false;
      });

    //把选择的放在右侧，让玩家回顾
    selectChoice.value.push(content);
    //加载出来后，因为next是选择后的页面，所以生成后应该跳转到最新页面
    currentStoryIndex.value = next;
    currentStoryIndex1.value = currentStoryIndex.value;

    console.log(isloading.value);
    //加载结束
  } catch {
    ElMessage.info("请求出现故障，请稍等");
  }
}

onMounted(() => {
  // const firtRecord = await db.Apikey.toCollection().first();
  // if (firtRecord) {
  //   apiKey.value = firtRecord.apikey;
  //   ModelId.value = firtRecord.model;
  // }

  //   if (firtRecord) {
  //     apiKey.value = firtRecord.apikey as string;
  //     ModelId.value = firtRecord.model as string;
  //   }
  apiKey.value = props.apiKey as string;
  ModelId.value = props.modelId as string;
  console.log(apiKey.value, ModelId.value);
  stories.value.push({
    story: myData.value.Description,
    choice: props.Choice,
    round: 10,
  });
  currentStoryIndex.value++;
  currentStoryIndex1.value = currentStoryIndex.value;
});
</script>

<style scoped>
.notebook {
  width: 100%;
  display: flex;
  height: 500px;
  flex-direction: row;
  justify-content: center;
  background-color: #f2e9d3;
  border: 10px solid #8b5b34;
  box-shadow: 5px 5px 5px #888888;
  margin: auto;
}

.left-pane {
  padding: 20px;
  text-align: justify;
  width: 50%;

  border-right: 10px solid #c59f7f;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-pane button {
  margin-top: auto;
}

.right-pane {
  width: 50%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-pane .content {
  display: flex;
  flex-direction: column;
}

.right-pane .content1 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-pane button {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2,
p {
  margin: 0;
}

h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

p {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 30px;
}

button {
  display: block;
  margin-bottom: 10px;

  padding: 5px 10px;
  font-size: 20px;
  background-color: #f2e9d3;
  border: none;
  box-shadow: 2px 2px 2px #888888;
  cursor: pointer;
}

button:hover {
  background-color: #8b5b34;
  color: #f2e9d3;
}
</style>
