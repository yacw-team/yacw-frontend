<template>
  <div class="flex flex-row h-screen">
    <SideBar />
    <RouterView class="w-full p-4 py-8" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue";
</script>
