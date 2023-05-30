<template>
  <div>
    <el-button class="ml-4 mt-2" :icon="isCollapse ? Expand : Fold" circle @click="isCollapse = !isCollapse" />
    <el-menu default-active="2" class="el-menu-vertical-demo min-w-40" :collapse="isCollapse">
      <el-menu-item id="firstItem" index="0"></el-menu-item>
      <el-menu-item index="1" @click="$router.push('/')">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <template #title>主页</template>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/chat/0')">
        <el-icon>
          <ChatDotRound />
        </el-icon>
        <template #title>聊天</template>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/translate')">
        <el-icon>
          <Document />
        </el-icon>
        <template #title>翻译</template>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/game')">
        <el-icon>
          <SwitchFilled />
        </el-icon>
        <template #title>游戏</template>
      </el-menu-item>
      <el-menu-item @click="toggleDark()">
        <el-icon v-if="isDark">
          <Sunny />
        </el-icon>
        <el-icon v-else>
          <Moon />
        </el-icon>
        <template #title> {{ isDark ? "开灯" : "关灯" }} </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Document,
  ChatDotRound,
  HomeFilled,
  SwitchFilled,
  Sunny,
  Moon,
  Fold,
  Expand
} from '@element-plus/icons-vue'
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isCollapse = ref(true);
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 120px;
  min-height: 400px;
}

#firstItem {
  width: 65px;
  height: 0px;
}
</style>