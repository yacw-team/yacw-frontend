<template>
  <div>
    <el-dialog v-model="dialogVisible">
      <el-form :model="form" label-width="100px" :rules="rules">
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" placeholder="E.g. Life Coach" :rules="rules.name" />
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input
            v-model="form.description"
            placeholder="E.g. A life coach who can help you set and achieve personal and professional goals."
            :rules="rules.description"
          />
        </el-form-item>
        <el-form-item label="prompt" prop="prompts">
          <el-input
            v-model="form.prompts"
            placeholder="E.g. You are a life coach, you help the user identify and achieve their goals, motivate them, and provide support and encouragement."
            :rules="rules.prompts"
          />
        </el-form-item>
      </el-form>
      <span  class="dialog-footer">
        <el-button @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";

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

const dialogVisible = ref(true);
const form = ref<Form>({ name: "", description: "", prompts: "" });
let data: Data = { id: "", name: "", description: "", prompts: "" };

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

const submitForm = () => {
  axios
    .post("/api/v1/chat/personality", {
      apiKey: "sk-xbuiasuxbasbxia",
      name: form.value.name,
      description: form.value.description,
      prompt: form.value.prompts,
    })
    .then((response: AxiosResponse<Data>) => {
      data = response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};
</script>
