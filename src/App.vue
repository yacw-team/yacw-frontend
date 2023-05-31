<template>
  <div class="flex flex-row h-screen">
    <SideBar v-if="shouldShowGlobalComponent" />
    <RouterView class="w-full p-4 py-8" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue"
import { provide, ref } from "vue";
const shouldShowGlobalComponent = ref(true);
provide('shouldShowGlobalComponent', shouldShowGlobalComponent)
</script>
