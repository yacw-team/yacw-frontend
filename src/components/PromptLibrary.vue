<template>
  <div>
    <el-button @click="centerDialogVisible = true">Click to open the Dialog</el-button>

    <el-dialog v-model="centerDialogVisible" title="Prompt Library" width="30%" align-center center>
      <el-row :gutter="50">
        <el-col :span="18">
          <el-input v-model="input" placeholder="Search your library" />
        </el-col>
        <el-col :span="5">
          <el-button>确定</el-button>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="50">
        <el-col :span="12">
          <el-text>
            Get more prompt please visit
          </el-text>
          <button @click="changeComponent" style="color: rgb(122, 127, 212);">
            prompt shop</button>
        </el-col>
        <el-col :span="12">
          <el-button @click="toggle">新建prompt</el-button>
          <Cp v-if="createdialog" />
        </el-col>
      </el-row>
      <br />
      <el-row v-for="index in p" :key="index" :gutter="50" class="item">
        <el-col :span="24">
          <el-card shadow="always">
            <span>prompt名字: {{ index.name }}</span>
            <br />
            <span>prompt内容: {{ index.content }}</span>
            <br />
            <el-button @click="getdetails(index.details)">Use it</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import Cp from "./CreatePersonality.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import promptShop from '@/components/PromptShop.vue'

//后期与刘少对接
const centerDialogVisible = ref(false);
const createdialog = ref(false);
function toggle() {
  createdialog.value = !createdialog.value;
}
interface Prompt {
  id: string;
  name: string;
  description: string;
  details: string;
  exampleInput: string;
  exampleOutput: string;
  content: string;
}
onMounted(() => {
  const fetchprompts = async (): Promise<Prompt[]> => {
    const response = await axios.get<Prompt[]>("API/v1/chat/prompts");
    return response.data;
  };
  (async () => {
    type prompts = Array<Prompt>;
    // eslint-disable-next-line no-redeclare
    let prompts = await fetchprompts();
    console.log(prompts);
  })();
});
type p = Array<Prompt>;
const p = [
  {
    id: "1",
    name: "2",
    description: "33",
    details: "44;",
    exampleInput: "55;",
    exampleOutput: "66;",
    content: "77;",
  },
  {
    id: "1",
    name: "234",
    description: "33",
    details: "44;",
    exampleInput: "55;",
    exampleOutput: "626;",
    content: "77;",
  },
];

const router = useRouter();
const emit = defineEmits(['response', 'changeShow']);


function getdetails(detail: string) {

  emit('response', detail);
  centerDialogVisible.value = false;

}

function changeComponent() {
  centerDialogVisible.value = false;
  emit('changeShow', true);

  console.log("成功发出事件")
}


const input = ref("");
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}
</style>