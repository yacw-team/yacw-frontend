<template>
  <div style="width:1000px;
  padding-left:100px;">
   
   <div style="width:500px;
   padding:10px 100px ;" 
   >
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
      <el-col style="padding:20px 80px  ;" :span="12" v-for="(character, index) in filteredCharacters" :key="index">
        <el-card  shadow="hover" style="width:350px; padding: 20px; border-radius:25px; ">
        <UserFilled style="width: 1em; height: 1em; margin-right: 8px" />
          <div style="height: 150px; ;overflow-y: auto;">
            <h3>{{ character.name }}</h3>
            <p>{{ character.introduction }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface Character {
  name: string;
  introduction: string;
};

const props = defineProps({
  characters: {
    type: Array as () => Character[],
    required: true,
    default() {
      return [
        {
          name: 'Career Counselor',
          introduction:
            'A career counselor who can help you with anything related to your career from job searching to career planning.',
        },
        {
          name: 'Financial Advisor',
          introduction:
            'A financial advisor who can provide advice on budgeting, saving, investing, retirement planning, and other financial issues.',
        },
        {
          name: 'Personal Trainer',
          introduction:
            'A personal trainer who can help you stay fit and improve your health by creating personalized fitness plans and providing workout routines.',
        },
        {
          name: 'Software Developer',
          introduction:
            'A software developer who can help you develop software programs and applications using programming languages such as Java, Python, and JavaScript.',
        },
        {
          name: 'Life Hacker',
          introduction:
            'A life hacker who can provide useful tips and tricks to help you optimize your daily routines, save time, and increase productivity.',
        },
        {
          name: 'DIY Expert',
          introduction:
            'A DIY expert who can provide advice and guidance on do-it-yourself projects, such as woodworking, painting, and crafting.',
        },
        {
          name: 'Mindfulness Coach',
          introduction:
            'A mindfulness coach who can guide you through meditation and relaxation techniques to help you focus on the present moment and reduce stress and anxiety.',
        },
        {
          name: 'Journalist',
          introduction:
            'A journalist who can research and report on newsworthy events, conduct interviews, and write news articles and stories.',
        },
      ];
    },
  },
});

const searchText = ref('');
const filteredCharacters = ref<Character[]>(props.characters);

function handleSearch() {
  filteredCharacters.value = props.characters.filter((character) =>
    character.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
}

function createCharacter() {
  // 这里可以使用API调用或其他方式实现创建角色的逻辑
  console.log('创建角色');
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