<template>
    <div>
        <h2>Test2</h2>
        <!-- <input type="text" v-model="jsonData.prompts"> -->
        <textarea type="text" v-model="input" ></textarea>
       
    </div>
    <PromptLibrary></PromptLibrary>
</template>
  
<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PromptLibrary from '@/components/PromptLibrary.vue'


const route = useRoute();
const refresh=ref(true);
//也可以获取整个的prompt
// const queryString = decodeURIComponent(route.query.encodedData);
//const jsonData = JSON.parse(queryString);
//   function output(){
//     console.log(route.query.encodedData)
//   }

// 解析URL中的数据
// const urlParams = new URLSearchParams(window.location.search);
// let data = urlParams.get('data') || "";

const Jsondata = route.query.data ? (Array.isArray(route.query.data) ? route.query.data[0] : route.query.data) : null;
const prompts = Jsondata ? JSON.parse(Jsondata) : "";


const temp=ref<string>(prompts);
const input = computed({
    get() {
        
        return localStorage.getItem('temp')+temp.value;
    },
    set(value) {
        localStorage.setItem('temp', value);
    }
});

onMounted(()=>[
    input.value
])

watch(() => route.query.data, (newVal) => {
  const dataStr = Array.isArray(newVal) ? newVal[0] : newVal;
  const data = dataStr ? JSON.parse(dataStr) : '';
  temp.value = data;
});





// // 使用ref创建响应式变量
// const dataInput = ref(data);

// // 监听data变化
// watch(urlParams, (newVal) => {
//   const newData = newVal.get("data") || "";
//   dataInput.value = newData;
// });



</script>
  
