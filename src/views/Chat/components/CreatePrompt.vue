<template>
  <div>
    <el-dialog v-model="dialogVisible">
      <el-form :model="form" label-width="100px" :rules="rules">
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" placeholder="E.g. Life Coach" :rules="rules.name" />
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input v-model="form.description"
            placeholder="E.g. A life coach who can help you set and achieve personal and professional goals."
            :rules="rules.description" />
        </el-form-item>
        <el-form-item label="prompt" prop="prompts">
          <el-input v-model="form.prompts"
            placeholder="E.g. You are a life coach, you help the user identify and achieve their goals, motivate them, and provide support and encouragement."
            :rules="rules.prompts" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { db } from "@/database/db";
import type { Prompt } from "@/api/chat/prompt/res";
import type { sendNewPrompt } from "@/api/chat/prompt/req";
import { getnewprompts } from "@/api/chat/prompt/prompt";


interface Data {
  id: string;
  name: string;
  description: string;
  prompts: string;
}

interface Form {
  name: string;
  description: string;
  prompts: string;
}

const emit = defineEmits(["createPrompt"]);
const apiKey = ref("");
const dialogVisible = ref(true);
const form = ref<Form>({ name: "", description: "", prompts: "" });
// let data: Data = { id: "", name: "", description: "", prompts: "" };
let data:Prompt; 

const rules = {
  name: [
    { required: true, message: "Please input value", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  description: [
    { required: true, message: "Please input value", trigger: "blur" },
  ],
  prompts: [{ required: true, message: "Please input value", trigger: "blur" }],
};

const submitForm = async () => {
  try {
    const createnewPrompt :sendNewPrompt={
      apiKey: apiKey.value,
      name: form.value.name,
      description: form.value.description,
      prompts: form.value.prompts,
    }
    data =await getnewprompts(createnewPrompt);
    
    emit("createPrompt", data);
  }catch(error){
      emit("createPrompt", data); 
  }finally{
     dialogVisible.value = false;
  }
};



onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apiKey.value = firtRecord.apikey as string;
    }
  } finally {
    db.close();
  }
})
</script>
