<template>
  <el-button @click="centerDialogVisible = true" round
  style="font-weight: bold; color: white; background-color: coral;">Click to open the Dialog</el-button>
  <el-dialog v-model="centerDialogVisible" title="Prompt Library" align-center center
    :style="{ 'max-width': '30%', 'max-height': '80%' }" width="auto" height="auto">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Your prompt" name="first">
        <el-row :gutter="50">
          <el-col :span="16">
            <el-input v-model="input" placeholder="Search your prompt" />
          </el-col>
          <el-col :span="6">
            <el-button>确定</el-button>
          </el-col>
        </el-row>
        <br />
        <el-col :span="12">
          <el-button @click="toggle">新建prompt</el-button>
          <Cp v-if="createdialog" />
        </el-col>
        <br />
        <el-row v-for="index in p" :key="index" :gutter="50" class="item">
          <el-col :span="24">
            <el-card shadow="always">
              <span>prompt名字: {{ index.name }}</span>
              <br />
              <span>prompt内容: {{ index.content }}</span>
              <br />
              <div style="display:flex;justify-content:flex-end;align-items:flex-end;">
                <el-button @click="getdetails(index.details)">Use it</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Community Prompts" name="second">
        <el-row :gutter="50">
          <el-col :span="16">
            <el-input v-model="input" placeholder="Search your prompt" />
          </el-col>
          <el-col :span="5">
            <el-button>确定</el-button>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="50">
          <el-col :span="18">
            <el-text>
              Get more prompt please visit
              <button @click="changeComponent" style="color: rgb(122, 127, 212);">
                prompt shop</button>
            </el-text>
          </el-col>
        </el-row>
        <br />
        <el-row v-for="index in p" :key="index" :gutter="50" class="item">
          <el-col :span="24">
            <el-card shadow="always">
              <span>prompt名字: {{ index.name }}</span>
              <br />
              <span>prompt内容: {{ index.content }}</span>
              <br />
              <div style="display:flex;justify-content:flex-end;align-items:flex-end;">
                <el-button @click="getdetails(index.details)">Use it</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import Cp from "./CreatePersonality.vue";
import axios from "axios";
import { useRouter } from "vue-router";
const centerDialogVisible = ref(false);
const createdialog = ref(false);
const activeName = ref('first')

function toggle() {
  createdialog.value = !createdialog.value;
}
interface Prompt {
  id: string;
  name: string;
  description: string;
  details: string;
  exampleInput: string;
  exampleOutput: string;
  content: string;
}

//获取后端的公开的prompt
const fetchprompts = async (): Promise<Prompt[]> => {
  const response = await axios.get<Prompt[]>("API/v1/chat/prompts");
  return response.data;
};

//获取后端的用户的prompt
const fetchUserprompts = async (): Promise<Prompt[]> => {
  const responseUerPrompt = await axios.get<Prompt[]>("API/v1/chat/myprompts");
  return responseUerPrompt.data;
};
   

onMounted(() => {
  (async () => {
    type prompts = Array<Prompt>;
    // eslint-disable-next-line no-redeclare
    let prompts = await fetchprompts();
    console.log(prompts);
  })();

  (async () => {
    type userPrompts = Array<Prompt>;
    // eslint-disable-next-line no-redeclare
    let userPrompts = await fetchprompts();
    console.log(userPrompts);
  })();
});



type p = Array<Prompt>;
const p = [
  {
    id: "1",
    name: "2",
    description: "33",
    details: "软件工程师;",
    exampleInput: "55;",
    exampleOutput: "66;",
    content: "77;",
  },
  {
    id: "1",
    name: "234",
    description: "33",
    details: "音乐家;",
    exampleInput: "55;",
    exampleOutput: "626;",
    content: "77;",
  },
];

const router = useRouter();
const emit = defineEmits(['response', 'changeShow']);


function getdetails(detail: string) {

  emit('response', detail);
  centerDialogVisible.value = false;

}

function changeComponent() {
  centerDialogVisible.value = false;
  emit('changeShow', true);

  console.log("成功发出事件")
}


const input = ref("");
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}
</style>