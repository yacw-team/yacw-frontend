<template>
  <el-button @click="open" round 
  style="background-color: rgb(186, 100, 205); color: white; font-weight: bold;">Select AIcharacter</el-button>
   <div style="width:1200px;
         padding-left:100px;">
        
    <el-dialog style="width:1200px;" v-model="dialogVisible">
    <div style = "width:500px;
    padding:10px 100px;" >
    <el-form label-position="top">
       <el-form-item > 
         <el-input v-model="searchText" @input="handleSearch"  
         class="w-50 m-2" 
         placeholder="搜索角色"
        size="large" 
        clearable ></el-input>
       </el-form-item>
     </el-form>
     </div>
     <div style="padding-left:100px;">
     <el-button  @click="createCharacter">Add Character</el-button>
     </div>
     <el-row :gutter="35">
       <el-col style="padding:20px 80px  ;" :span="12" v-for="(personalities, index) in filteredPersonalities" :key="index">
         <el-card  shadow="hover" style="width:350px; padding: 20px;
          border-radius:25px; "    @click="selectCard(personalities)" >
         <UserFilled style="width: 1em; height: 1em; margin-right: 8px" />
           <div style="height: 150px; ;overflow-y: auto;">
             <h3>{{ personalities.ModelName }}</h3>
             <p>{{ personalities.Details }}</p>
           </div>
         </el-card>
       </el-col>
     </el-row>
     <br>
   </el-dialog>  
   </div>
 </template>
 <script setup lang="ts">
 import { defineProps, ref } from 'vue';
 import axios from "axios";
 
 interface Personality {
  
   Id       : number
   ModelName :string
   Details   :string
   Prompt    :string
   Uid       :string
   Designer  :number
 }

 const emit=defineEmits(['getCharacter']);
 const  dialogVisible = ref(false);
 const open = () => {
    
     dialogVisible.value = true;
   
 };
 const props = defineProps({
   personalities: {
     type: Array as () => Personality[],
     required: true,
     default() {
       return [
         {
           ModelName: 'Career Counselor',
           Details:
             'A career counselor who can help you with anything related to your career from job searching to career planning.',
         },
         {
           ModelName: 'Financial Advisor',
           Details:
             'A financial advisor who can provide advice on budgeting, saving, investing, retirement planning, and other financial issues.',
         },
         {
           ModelName: 'Personal Trainer',
           Details:
             'A personal trainer who can help you stay fit and improve your health by creating personalized fitness plans and providing workout routines.',
         },
         {
           ModelName: 'Software Developer',
           Details:
             'A software developer who can help you develop software programs and applications using programming languages such as Java, Python, and JavaScript.',
         },
         {
           ModelName: 'Life Hacker',
           Details:
             'A life hacker who can provide useful tips and tricks to help you optimize your daily routines, save time, and increase productivity.',
         },
         {
           ModelName: 'DIY Expert',
           Details:
             'A DIY expert who can provide advice and guidance on do-it-yourself projects, such as woodworking, painting, and crafting.',
         },
         {
           ModelName: 'Mindfulness Coach',
           Details:
             'A mindfulness coach who can guide you through meditation and relaxation techniques to help you focus on the present moment and reduce stress and anxiety.',
         },
         {
           ModelName: 'Journalist',
           Details:
             'A journalist who can research and report on newsworthy events, conduct interviews, and write news articles and stories.',
         },
       ];
     },
   },
 });
 
 const searchText = ref('');
 const filteredPersonalities = ref<Personality[]>(props.personalities);
 
 async function handleSearch() {
   const response = await axios.get('');
   const personalities: Personality[] = response.data;
   filteredPersonalities.value = personalities.filter((personality) =>
     personality.ModelName.toLowerCase().includes(searchText.value.toLowerCase())
   );
 }
 
 function createPersonality() {
   // 这里可以使用API调用或其他方式实现创建角色的逻辑
   console.log('创建Personality');
 }

function selectCard(personalities:Personality){
  emit('getCharacter',personalities);
  dialogVisible.value=false
}

 </script>
 
 <style scoped>
 .close-btn {
   position: absolute;
   top: 10px;
   right: 10px;
 }
 h3
 {
     font-size:20px;
     font-style:bold;
 }
 p{
     color:grey;
 }
 </style>
 
 
 
