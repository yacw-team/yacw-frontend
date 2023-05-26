<template>
  <el-button @click="centerDialogVisible = true" round
    style="font-weight: bold; color: white; background-color: coral;">Prompt 商店</el-button>
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
          <Cp v-if="createdialog" @createPrompt="(msg: Prompt) => confirmSuccess(msg)" />
        </el-col>
        <br />
        <el-row v-for="index in userPrompt.Prompts" :key="index" class="item">
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
        <el-row v-for="index in p.Prompts" :key="index" class="item">
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
import { onMounted, ref, defineEmits } from "vue";
import Cp from "./CreatePersonality.vue";
import axios from "axios";
import { db } from "@/database/db";
import { ElMessage } from "element-plus";


const centerDialogVisible = ref(false);
const createdialog = ref(false);
const activeName = ref('first')
const emit = defineEmits(['response', 'changeShow', 'sucessCreate']);
const userPrompt = ref({ Prompts: [] as Prompt[] })

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
        userPrompt.value.Prompts = response.data.Prompts
      })
  } 
}



onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apikey.value = firtRecord.apikey as string;
    }
  } finally {
    db.close();
    fetchUserprompts
  }
})

const p = ref({ Prompts: [] as Prompt[] })
onMounted(async () => {
  axios.get('/api/v1/chat/prompts').then(response => {
    p.value = response.data;
  }).catch((error => {
    p.value = {
      Prompts: [
        {
          id: "1",
          name: "软件工程师",
          description: "水水水水水水水水水水水水水水水水水水水",
          prompts: "软件工程师;",

        },
        {
          id: "1",
          name: "音乐家",
          description: "哇哇哇哇哇哇哇",
          prompts: "音乐家;",

        }, 
      ]
    }
  })).finally(()=>{
    const s = ref({ Prompts: [] as Prompt[] });
    let length=4;     //固定显示的，从后端获取的prompt的数量
    for(let i=0;i<length&&i<p.value.Prompts.length;i++){
      s.value.Prompts[i]=p.value.Prompts[i];
    }
    p.value.Prompts=s.value.Prompts;
  })
})



function confirmSuccess(msg :  Prompt) {
  if (msg.id !="" ) {
    userPrompt.value.Prompts.push(msg);
    ElMessage.info('create prompt success')
  } else  {
    ElMessage.info('create prompt falure')
  }
}


function getdetails(detail: string) {

  emit('response', detail);
  centerDialogVisible.value = false;

}

function changeComponent() {
  centerDialogVisible.value = false;
  emit('changeShow', true);
}


const input = ref("");
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}
</style>
