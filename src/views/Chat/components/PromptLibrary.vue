<template>
  <el-button @click="centerDialogVisible = true" round
    style="font-weight: bold; color: white; background-color: coral;">Click to open the Dialog</el-button>
  <el-dialog v-model="centerDialogVisible" title="Prompt Library" align-center center width="auto" height="auto">
    <el-tabs v-model="activeName" class="demo-tabs" style="height: fit-content;">
      <el-tab-pane label="Your prompt" name="first">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="input" placeholder="Search your prompt" />
          </el-col>
          <el-col :span="8">
            <el-button>确定</el-button>
          </el-col>
        </el-row>
        <br />
        <el-col :span="12">
          <el-button @click="toggle">新建prompt</el-button>
          <Cp v-if="createdialog" />
        </el-col>
        <br />
        <el-row v-for="index in temp" :key="index" class="item">
          <el-col :span="24">
            <el-card shadow="always">
              <span>prompt名字: {{ index.name }}</span>
              <br />
              <span>prompt内容: {{ index.description }}</span>
              <br />
              <div style="display:flex;justify-content:flex-end;align-items:flex-end;">
                <el-button @click="getdetails(index.prompts)">Use it</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Community Prompts" name="second">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="input" placeholder="Search your prompt" />
          </el-col>
          <el-col :span="8">
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
        <el-row v-for="index in p" :key="index" class="item">
          <el-col :span="24">
            <el-card shadow="always">
              <span>prompt名字: {{ index.name }}</span>
              <br />
              <span class="prompt-description">prompt内容: {{ index.description }}</span>
              <br />
              <div style="display:flex;justify-content:flex-end;align-items:flex-end;">
                <el-button @click="getdetails(index.prompts)">Use it</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import {  onMounted, ref } from "vue";
import Cp from "./CreatePersonality.vue";
import axios from "axios";
import { db } from "@/database/db";

const centerDialogVisible = ref(false);
const createdialog = ref(false);
const activeName = ref('first')

const temp = ref();

function toggle() {
  createdialog.value = !createdialog.value;
}
interface Prompt {
  id: string,
  name: string,
  description: string,
  prompts: string,

}


const apikey = ref("");

//获取后端的用户的prompt
const fetchUserprompts = async () => {

  if (apikey.value != '' || apikey.value != null) {
    axios
      .post("/api/v1/chat/myprompts", {
        apiKey: apikey.value,
      })
      .then(async (response) => {
        temp.value = response.data
      }).catch((error) => {
        console.log("请求用户prompt错误");
        console.log(error);
      })
  } else {
    console.log("没有apiKey，给默认的数据")
    temp.value = p
  }
}


onMounted(fetchUserprompts);

onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apikey.value = firtRecord.apikey as string;
    }
  } finally {
    db.close();
  }
})

const p: Array<Prompt> = [
  {
    id: "1",
    name: "软件工程师",
    description: "水水水水水水水水水水水水水水水水水水水",
    prompts: "软件工程师;",

  },
  {
    id: "1",
    name: "音乐家",
    description: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
    prompts: "音乐家;",
  },
];


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
