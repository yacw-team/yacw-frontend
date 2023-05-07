<template>
    <div>
        <h2>Test2</h2>
        <!-- <input type="text" v-model="jsonData.prompts"> -->
        <textarea type="text" v-model="input"></textarea>
       
    </div>
    <PromptLibrary></PromptLibrary>
</template>
  
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PromptLibrary from '@/components/PromptLibrary.vue'


const route = useRoute();

//也可以获取整个的prompt
// const queryString = decodeURIComponent(route.query.encodedData);
//const jsonData = JSON.parse(queryString);
//   function output(){
//     console.log(route.query.encodedData)
//   }



const Jsondata = route.query.data;
const prompts = Jsondata ? JSON.parse(Jsondata) : "";
const input = computed({
    get() {
        return localStorage.getItem('temp')+prompts;
    },
    set(value) {
        localStorage.setItem('temp', value);
    }
});



onMounted(() => {
  
})

</script>
  
