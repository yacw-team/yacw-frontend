<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full p-2 md:w-4/5">
      <el-input
        v-model="textarea"
        :rows="8"
        type="textarea"
        resize="none"
        placeholder="请输入待翻译的文本"
      />
      <div class="flex">
        <el-icon size="20" class="flex-1 py-4"><Sort /></el-icon>
      </div>
      <el-input
        v-model="textarea"
        :rows="8"
        type="textarea"
        resize="none"
        readonly
        placeholder="翻译结果"
      />
    </div>
    <div class="flex flex-row items-center justify-center w-full p-2 md:w-1/5 md:flex-col">
      <div class="flex flex-col justify-center flex-1 w-1/2 md:w-full">
        <span>源语言</span>
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
        <span>目标语言</span>
        <el-select
          id="to-lang-select"
          v-model="toLang"
          filterable
          placement="bottom"
          placeholder="Select"
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
        <span>情感</span>
        <el-select
          v-model="emotion"
          id="to-lang-select"
          filterable
          placement="bottom"
          placeholder="Select"
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
        <span>文体</span>
        <el-select
          id="to-lang-select"
          v-model="style"
          filterable
          placement="bottom"
          placeholder="Select"
        >
          <el-option
            v-for="item in styleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
const textarea = ref("");
const fromLang = ref("auto");
const toLang = ref("");
const emotion = ref("");
const style = ref("");
</script>
