<template>
  <div>
    <el-button @click="openDialog">Add</el-button>

    <el-dialog v-model="dialogVisible">
      <el-form :v-model="form" label-width="100px" :rules="rules">
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" placeholder="E.g. Life Coach" />
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input
            v-model="form.description"
            placeholder="E.g. A life coach who can help you set and achieve personal and professional goals."
          />
        </el-form-item>
        <el-form-item label="prompt" prop="prompt">
          <el-input
            v-model="form.prompt"
            placeholder="E.g. You are a life coach, you help the user identify and achieve their goals, motivate them, and provide support and encouragement."
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
      
      <script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

interface Data {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

interface Form {
  name: string;
  description: string;
  prompt: string;
}

const form: Form = {
  name: "",
  description: "",
  prompt: "",
};

let data: Data = {
  id: "",
  name: "",
  description: "",
  prompt: "",
};
const submitForm = () => {
  axios
    .post("/v1/chat/personality", {
      apiKey: "123456",
      name: form.name,
      description: form.description,
      prompt: form.prompt,
    })
    .then((response: AxiosResponse<Data>) => {
      data = response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};

const rules = {
  name: [
    { required: true, message: "Please input value", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  description: [
    { required: true, message: "Please input value", trigger: "blur" },
  ],
  prompt: [{ required: true, message: "Please input value", trigger: "blur" }],
};
</script>