<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">YACW</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" text @click="dialogTableVisible = true">帮助</el-menu-item>
    <el-dialog v-model="dialogTableVisible" title="游戏玩法" center>
      <el-text type="textarea" class="message-size">《无尽剧本》是一款纯文字游戏，你可以选择不同的剧本展开游戏。
        通过点击按钮，你将体验引人入胜的故事，并面临四个选项。每个选项都会触发全新的事件，给你带来无尽可能性。
        决策将决定你的命运，究竟你能否迎接挑战，探索故事的深处？尽情享受这个引人入胜的冒险，挑战你的想象力与智慧！</el-text>
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

.message-size {
  font-size: larger;
  font-style: normal;
  font-weight: 1000;
}
</style>
