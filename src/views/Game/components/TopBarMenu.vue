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
              <el-menu-item index="1" text @click="dialogTableVisible = true">帮助</el-menu-item>
              <el-dialog v-model="dialogTableVisible" title="游戏玩法">
                <el-text type="textarea"></el-text>
              </el-dialog>
    
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
const dialogTableVisible = ref(false)


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
