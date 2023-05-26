<template>
    <div class="flex flex-col space-y-4 ...">
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">YACW</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1" text @click="open">帮助</el-menu-item>
          <el-sub-menu index="2">
            <template #title>查看历史</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-menu-item index="2-3">查看全部历史</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">退出</el-menu-item>
        </el-menu>
      </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {  ElMessageBox } from 'element-plus'

const open = () => {
  ElMessageBox.alert('This is a message', '游戏玩法', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确认',
  })
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

</style>
