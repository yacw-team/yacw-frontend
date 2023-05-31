<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0">YACW</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" text @click="dialogTableVisible = true">帮助</el-menu-item>
    <el-dialog v-model="dialogTableVisible" title="游戏玩法">
      <el-text type="textarea"></el-text>
    </el-dialog>
    <el-menu-item index="3" @click="showGlobalComponent">退出</el-menu-item>
  </el-menu>
</template>


<script setup lang="ts">

import { ref, inject, type Ref } from 'vue'
const dialogTableVisible = ref(false)
const shouldShowGlobalComponent = inject('shouldShowGlobalComponent') as Ref<boolean>

function showGlobalComponent() {
  shouldShowGlobalComponent.value = true
}

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
