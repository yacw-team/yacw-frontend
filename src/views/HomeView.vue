

<template>
  <main>
    <HelloWorld />
    <el-button @click="toggle">新建prompt</el-button>
    <LookDetailsPrompt v-if="lookDetailsPrompt" :Jsondata="Jsondata" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import LookDetailsPrompt from "@/components/LookDetailsPrompt.vue";

const lookDetailsPrompt = ref(false);

function toggle() {
  lookDetailsPrompt.value = !lookDetailsPrompt.value;
  interface Jsondata {
    id: string;
    name: string;
    description: string;
    details: string;
    type: string;
    background: string;
    emoji: string;
  }
  const Jsondata = {
    id: "1",
    name: "2",
    description:
      "3S就将计就计就将计就计就将计就计斤斤计较经济界2巴巴爸爸不啵啵啵啵啵啵啵啵啵jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj啵啵啵DAS3",
    details:
      "asccccccc3S就将计就计就将计就计就将计就计斤斤计较经济界2巴巴爸爸不啵啵啵啵啵啵啵啵啵jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj啵啵啵DAS3",
    type: "111",
    background: "linear-gradient(to bottom, #f8a5c2, #ffeedd)",
    emoji: "WZV47]@X`42US8)FYV0P3@D.png",
  };
  
}
</script>