<template>
  <div>
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
          <el-row v-for="index in reversedPrompts" :key="index" class="item">
            <el-col :span="24">
              <el-card shadow="always">
                <span>prompt名字: {{ index.name }}</span>
                <br />
                <span>prompt内容: {{ index.description }}</span>
                <br />

                <el-row style="margin-bottom: 0px;">
                  <el-col :span="14">
                    <el-icon style="height: 100%;" @click="deletePrompt(index.id)">
                      <Delete />
                    </el-icon></el-col>
                  <el-col style="display:flex;justify-content:flex-end;align-items:flex-end;" :span="10">
                    <el-button @click="getdetails(index.prompts)">Use it</el-button>
                  </el-col>

                </el-row>

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
                <button @click="changeComponent" style="color: rgb(122, 127, 212);">prompt shop</button>
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineEmits, type Ref, computed } from "vue";
import Cp from "./CreatePrompt.vue";
import axios from "axios";
import { db } from "@/database/db";
import { ElMessage } from "element-plus";
import type { Prompt } from "@/api/chat/prompt/res";
import { getmyprompts, getprompts,deleteprompts } from "@/api/chat/prompt/prompt";
import type { myPromptApikey ,sendPromptId} from "@/api/chat/prompt/req";
import { Delete } from "@element-plus/icons-vue"

const apiKey = ref("");
const centerDialogVisible = ref(false);
const createdialog = ref(false);
const activeName = ref("first");
const emit = defineEmits(["response", "changeShow", "sucessCreate"]);

let userPrompt: Ref<Prompt[]> = ref([]);

function toggle() {
  createdialog.value = !createdialog.value;
}



const reversedPrompts = computed(() => userPrompt.value.slice().reverse())


let p: Ref<Prompt[]> = ref([]);
onMounted(async () => {

  p.value = await getprompts();

  p.value = p.value.slice(0, 4);

});


function deletePrompt(promptsId: string) {


    const response:sendPromptId =  {
      apiKey: apiKey.value,
      promptsId: promptsId.toString() ,
    };
    
    deleteprompts(response);
   userPrompt.value = userPrompt.value.filter(
    (prompt) => prompt.id !== promptsId)   
}

onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apiKey.value = firtRecord.apikey as string;
    }

    const response:myPromptApikey =  {
      apiKey: apiKey.value,
    };
    userPrompt.value=await getmyprompts(response)
  } finally {
    db.close();
  }
})



function confirmSuccess(msg: Prompt) {
  if (msg.id != null) {
    userPrompt.value.push(msg);
  
  } else {
    ElMessage.info("create prompt falure");
  }
}

function getdetails(detail: string) {
  emit("response", detail);
  centerDialogVisible.value = false;
}

function changeComponent() {
  centerDialogVisible.value = false;
  emit("changeShow", true);
}

const input = ref("");
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}
</style>
