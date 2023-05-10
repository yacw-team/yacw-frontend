<template>
  <div>
    <div class="pt-16 text-center">
      <h1 class="text-4xl font-bold">Get started with ChatGPT API</h1>
      <div class="flex flex-row items-center justify-center p-16">
        <el-button
          class="mx-2"
          type="warning"
          round
          @click="addKeyDialogVisiable = true"
          >输入 API Key</el-button
        >
        <el-button
          class="mx-2"
          type="primary"
          round
          @click="selectModelDialogVisiable = true"
          >选择 ChatGPT 模型</el-button
        >
      </div>
    </div>
    <el-main>
      <div
        class="flex flex-row flex-wrap items-center justify-center mx-2 h-max"
      >
        <el-card class="w-1/3 mx-4 md:w-1/5 md:mx-10 md:p-4">
          <template #header>
            <div class="flex flex-row justify-center">
              <el-icon size="20" class="mx-1">
                <Coin />
              </el-icon>
              <span class="mx-1 text-xl font-semibold">免费开源</span>
            </div>
          </template>
          <div>
            <p>
              YACW
              是一款完全免费的开源聊天机器人项目，旨在帮助开发人员快速构建功能强大的聊天应用程序。
            </p>
          </div>
        </el-card>

        <el-card class="w-1/3 mx-4 md:w-1/5 md:mx-10 md:p-4">
          <template #header>
            <div class="flex flex-row justify-center">
              <el-icon size="20" class="mx-1">
                <User />
              </el-icon>
              <span class="mx-1 text-xl font-semibold">注重隐私</span>
            </div>
          </template>
          <div>
            <p>
              我们非常注重用户隐私和数据保护，我们不会收集任何敏感信息，并采取了多种措施确保所有数据的安全性。
            </p>
          </div>
        </el-card>

        <el-card class="w-1/3 mx-4 my-10 md:w-1/5 md:mx-10 md:my-0 md:p-4">
          <template #header>
            <div class="flex flex-row justify-center">
              <el-icon size="20" class="mx-1">
                <MagicStick />
              </el-icon>
              <span class="mx-1 text-xl font-semibold">体验良好</span>
            </div>
          </template>
          <div>
            <p>
              YACW
              基于最先进的自然语言处理技术，能够以流畅、自然的方式与用户交互，提供令人满意的使用体验。
            </p>
          </div>
        </el-card>
      </div>
    </el-main>
  </div>
  <el-dialog
    v-model="addKeyDialogVisiable"
    :show-close="false"
    width="40%"
    title="🔑 输入你的 OpenAI API Key"
    center
  >
    <div class="px-4">
      <div id="add-key-hint">
        <div>
          您需要在
          <a
            class="text-blue-500"
            href="https://platform.openai.com/account/api-keys"
            >OpenAI Key Management</a
          >
          页面获取 OpenAI API Key.
        </div>
        <div class="my-1">
          您的 Key 将会被保存在本地浏览器中，我们不会收集您的 Key.
        </div>
      </div>
      <div id="add-key-input" class="my-6">
        <el-input
          v-model="openAIkey"
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <Transition>
          <div class="mt-4 text-red-500" v-if="addKeyInputError">
            您输入的 Key 格式有误。OpenAI API Key 应为 "sk-" 打头，长度为 51
            一个字符的串。
          </div>
        </Transition>
      </div>
      <div id="add-key-btns" class="flex flex-row justify-center">
        <el-button
          class="mr-2"
          @click="
            addKeyDialogVisiable = false;
            openAIkey = '';
            addKeyInputError = false;
          "
          >取消</el-button
        >
        <el-button class="ml-2" type="primary" @click="handleAddKeySubmit"
          >保存</el-button
        >
      </div>
    </div>
  </el-dialog>
  <el-dialog
    v-model="selectModelDialogVisiable"
    :show-close="false"
    width="40%"
    title="🤖 选择您想使用的模型"
    center
  >
    <div class="px-4">
      <div>
        <div class="flex flex-row items-center justify-center">
          <ModelSelectCard
            v-for="model in models"
            @submit-model="(modelValue: string) => handleSelectModelSubmit(modelValue)"
            v-bind:key="model.id"
            class="w-1/2 m-2"
            :model-image="model.modelImage"
            :model-name="model.modelName"
            :model-value="model.modelValue"
            :model-description="model.modelDescription"
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Coin, User, MagicStick } from "@element-plus/icons-vue";
import ModelSelectCard from "@/views/HomePage/components/ModelSelectCard.vue";

const addKeyDialogVisiable = ref(false);
const selectModelDialogVisiable = ref(false);
const addKeyInputError = ref(false);

const openAIkey = ref("");
const selectedModel = ref("");

const models = [
  {
    id: "0",
    modelImage:
      "/gpt3.5.svg",
    modelName: "GPT-3.5",
    modelValue: "gpt3.5",
    modelDescription: "快速，准确度令人满意",
  },
  {
    id: "1",
    modelImage:
      "/gpt4.svg",
    modelName: "GPT-4",
    modelValue: "gpt4",
    modelDescription: "超乎想象的准确，但缓慢",
  },
];

const handleAddKeySubmit = () => {
  // check key format
  if (openAIkey.value.slice(0, 3) != "sk-" || openAIkey.value.length !== 51) {
    addKeyInputError.value = true;
    return;
  }
  console.log(openAIkey.value);
  addKeyDialogVisiable.value = false;
};

const handleSelectModelSubmit = (modelValue: string) => {
  selectedModel.value = modelValue;
  selectModelDialogVisiable.value = false;
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>