<template>
  <promptShop @changeShow="(msg: boolean) => isVisible = msg" v-if="isVisible" 
    @changeShow1="(msg: boolean) => isVisible = msg"  
    @sendPrompt="(msg: string) => input += msg" />
  <div v-if="!isVisible">

    <h2>对话测试页面</h2>
    <!-- <input type="text" v-model="jsonData.prompts"> -->
    <textarea type="text" v-model="input"></textarea>
    <PromptLibrary @response="(msg: string) => input += msg" 
      @changeShow="(msg: boolean) => isVisible = msg"
      ></PromptLibrary>
  </div>
</template>
  
<script setup lang="ts">
import { provide, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PromptLibrary from '@/components/PromptLibrary.vue'
import promptShop from '@/components/PromptShop.vue'


const input = ref('')
const prompt = ref()
const isVisible = ref(false);


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




</script>
  
