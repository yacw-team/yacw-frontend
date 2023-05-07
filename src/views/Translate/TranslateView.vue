<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full p-2 md:w-4/5">
      <el-card>
        <el-input
          class="no-border larger-font"
          v-model="fromText"
          :rows="6"
          type="textarea"
          resize="none"
          placeholder="请输入待翻译的文本"
          :readonly="fromTextReadOnly"
          @blur.stop="handleSubmit"
        />
      </el-card>
      <div class="flex my-2">
        <el-icon
          size="20"
          class="flex-1 py-4 hover:cursor-pointer"
          @click="handleSwitchText"
          ><Sort
        /></el-icon>
      </div>
      <el-skeleton class="" :loading="toTextLoading" animated>
        <template #template>
          <el-card>
            <el-skeleton :rows="4" animated />
          </el-card>
        </template>
        <template #default>
          <el-card>
            <el-input
              class="no-border larger-font"
              v-model="toText"
              :rows="6"
              type="textarea"
              resize="none"
              readonly
              placeholder="翻译结果"
            />
          </el-card>
        </template>
      </el-skeleton>
    </div>
    <div
      class="flex flex-row items-center justify-center w-full p-2 md:w-1/5 md:flex-col"
    >
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <span class="my-1">源语言</span>
        <el-select
          id="from-lang-select"
          v-model="fromLang"
          filterable
          placement="bottom"
          placeholder="Select"
        >
          <el-option
            v-for="item in fromLangList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <span class="my-1">目标语言</span>
        <el-select
          id="to-lang-select"
          v-model="toLang"
          filterable
          placement="bottom"
          placeholder="请选择"
        >
          <el-option
            v-for="item in toLangList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <span class="my-1">情感</span>
        <el-select
          v-model="emotion"
          id="to-lang-select"
          filterable
          placement="bottom"
          placeholder="可选"
        >
          <el-option
            v-for="item in emotionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <span class="my-1">文体</span>
        <el-select
          id="to-lang-select"
          v-model="style"
          filterable
          placement="bottom"
          placeholder="可选"
        >
          <el-option
            v-for="item in styleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <el-button @click="handleResetBtn"> 重置选项 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fromLangList } from "./list/fromLang";
import { toLangList } from "./list/toLang";
import { emotionList } from "./list/emotion";
import { styleList } from "./list/style";
import { Sort } from "@element-plus/icons-vue";
import { ref } from "vue";

import { getTranslateResult } from "@/api/translate/translate";
import type { GetTranslateResultReq } from "@/api/translate/req";
import type { GetTranslateResultRes } from "@/api/translate/res";

const fromText = ref("");
const fromTextReadOnly = ref(false);
const toText = ref("");
const toTextLoading = ref(false);
const fromLang = ref("auto");
const toLang = ref("english");
const emotion = ref("");
const style = ref("");

const handleSubmit = async () => {
  // check if fromText is empty
  if (!fromText.value) return;

  // stop user input
  fromTextReadOnly.value = true;
  // start ToText loading
  toTextLoading.value = true;

  const req: GetTranslateResultReq = {
    apiKey: "", // TODO: 从数据库中获取
    content: {
      emotion: emotion.value,
      style: style.value,
      preTranslate: fromText.value,
    },
    from: fromLang.value,
    to: toLang.value,
  };
  const res: GetTranslateResultRes = await getTranslateResult(req);
  // allow user input
  fromTextReadOnly.value = false;
  // stop ToText loading
  toTextLoading.value = false;
  toText.value = res.content.translated;
};

const handleSwitchText = () => {
  const temp = fromText.value;
  fromText.value = toText.value;
  toText.value = temp;
};

const handleResetBtn = () => {
  fromLang.value = "auto";
  toLang.value = "english";
  emotion.value = "";
  style.value = "";
};
</script>

<style>
.no-border .el-textarea__inner {
  border: none;
  box-shadow: 0 0 0 0;
}

.larger-font .el-textarea__inner {
  font-size: 1.2rem;
}
</style>
