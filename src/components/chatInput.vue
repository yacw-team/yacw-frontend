<template>
  <promptShop @changeShow="(msg: boolean) => isVisible = msg" v-if="isVisible"
    @changeShow1="(msg: boolean) => isVisible = msg" @sendPrompt="(msg: string) => input += msg" />
  <div v-if="!isVisible">

    <h2>对话测试页面</h2>
    <!-- <input type="text" v-model="jsonData.prompts"> -->
    <PromptLibrary @response="(msg: string) => input += msg"
       @changeShow="(msg: boolean) => isVisible = msg" />
    <Alcharacter @getCharacter="(msg: Personality) => getCharacterinfo(msg)"/>
    <br />
    <div v-if="isShowCharacter" style="background-color: aquamarine; width: fit-content;  border-radius: 10px;">
      <el-text> You are chatting with a </el-text>
      <text  style="font-weight: bold;">{{ Character.ModelName }} </text>
    </div>
    <br />

    <el-input type="text" v-model="input" ></el-input>
    
  </div>
</template>
  
<script setup lang="ts">
import { provide, ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import PromptLibrary from '@/components/PromptLibrary.vue'
import promptShop from '@/components/PromptShop.vue'
import Alcharacter from './Alcharacter.vue';

const input = ref('')
const prompt = ref()
const isVisible = ref(false);   //组件切换显示
const Character = ref();

interface Personality {
  
  Id       : number
  ModelName :string
  Details   :string
  Prompt    :string
  Uid       :string
  Designer  :number
}

const isShowCharacter = ref(false);
// 在组件挂载时从 localStorage 中恢复值
onMounted(() => {
  const savedInput = localStorage.getItem('input');
  if (savedInput) {
    input.value = savedInput;
  }
});

// 监听用户输入并更新 localStorage 中的值
input.value = localStorage.getItem('input') || '';
watch(() => input.value, (newVal) => {
  localStorage.setItem('input', newVal);
});

function getCharacterinfo(msg:Personality){
  console.log(msg);
  Character.value = msg;
  isShowCharacter.value=true
}


</script>
  
