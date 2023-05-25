<template>
  <div>
    <el-button @click="open" round size="large" style="
        background-color: rgb(186, 100, 205);
        color: white;
        font-weight: bold;
      ">AI 角色选择</el-button>
    <div>
      <el-dialog style="width: 1200px" v-model="dialogVisible">
        <div style="width: 500px; padding: 10px 100px">
          <el-form label-position="top">
            <el-form-item>
              <el-input v-model="searchText" @input="handleSearch" class="m-2 w-50" placeholder="搜索角色" size="large"
                clearable></el-input>
            </el-form-item>
          </el-form>
        </div>

        <el-row :gutter="35">
          <el-col style="padding: 20px 80px" :span="12" v-for="(personalities, index) in filteredPersonalities"
            :key="index">
            <el-card shadow="hover" :style="{ background: getRandomBackground() }" @click="selectCard(personalities)">
              <UserFilled style="width: 1em; height: 1em; margin-right: 8px" />
              <div style="height: 150px; overflow-y: auto">
                <h3>{{ personalities.name }}</h3>
                <p>{{ personalities.description }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <br />
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";


interface Personality {
  id: string;
  name: string;
  description: string;

}
const searchText = ref("");
const filteredPersonalities = ref<Personality[]>();
const emit = defineEmits(["getCharacter"]);
const dialogVisible = ref(false);
const open = () => {
  dialogVisible.value = true;
};
const props: Personality[] = [
  {
    id: "1",
    name: "Career Counselor",
    description:
      "A career counselor who can help you with anything related to your career from job searching to career planning.",
  },
  {
    id: "2",
    name: "Financial Advisor",
    description:
      "A financial advisor who can provide advice on budgeting, saving, investing, retirement planning, and other financial issues.",
  },
  {
    id: "3",
    name: "Personal Trainer",
    description:
      "A personal trainer who can help you stay fit and improve your health by creating personalized fitness plans and providing workout routines.",
  },
  {
    id: "4",
    name: "Software Developer",
    description:
      "A software developer who can help you develop software programs and applications using programming languages such as Java, Python, and JavaScript.",
  },
  {
    id: "5",
    name: "Life Hacker",
    description:
      "A life hacker who can provide useful tips and tricks to help you optimize your daily routines, save time, and increase productivity.",
  },
  {
    id: "6",
    name: "DIY Expert",
    description:
      "A DIY expert who can provide advice and guidance on do-it-yourself projects, such as woodworking, painting, and crafting.",
  },
  {
    id: "7",
    name: "Mindfulness Coach",
    description:
      "A mindfulness coach who can guide you through meditation and relaxation techniques to help you focus on the present moment and reduce stress and anxiety.",
  },
  {
    id: "8",
    name: "Journalist",
    description:
      "A journalist who can research and report on newsworthy events, conduct interviews, and write news articles and stories.",
  },
];

let randomColor1, randomColor2, randomColor3;

function getRandomBackground() {
  randomColor1 = Math.floor(Math.random() * 255);
  randomColor2 = Math.floor(Math.random() * 255);
  randomColor3 = Math.floor(Math.random() * 255);
  let background = ` rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
  return background;
}

onMounted(() => {
  axios
    .get("/api/v1/chat/personality")
    .then((response) => {
      console.log('send success')
      filteredPersonalities.value = response.data;
      console.log("获取的后端personality" + filteredPersonalities.value)
    })
    .catch(() => {
      filteredPersonalities.value = props;
    });
});



async function handleSearch() {
  let personalities: Personality[] = [];
  await axios.get("/api/v1/chat/personality").then((response) => {
    personalities = response.data;
  })
    .catch(() => {
      personalities = props;
    });

  filteredPersonalities.value = personalities.filter((personality) =>
    personality.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
}



function selectCard(personalities: Personality) {
  emit("getCharacter", personalities);
  dialogVisible.value = false;
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

h3 {
  font-size: 20px;
  font-style: bold;
}

p {
  color: grey;
}

.el-card {
  border-radius: 25px;
  width: 90%;
}
</style>
