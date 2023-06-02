<template>
  <div>
    <el-button class="ml-4 mt-2" :icon="isCollapse ? Expand : Fold" circle @click="isCollapse = !isCollapse" />
    <el-menu class="el-menu-vertical-demo min-w-40" :collapse="isCollapse">
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
      <el-menu-item @click="dialogVisuable = true">
        <el-icon>
          <Tools />
        </el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
    <el-dialog v-model="dialogVisuable" title="设置" width="30%">
      <!-- 设置白天/黑暗模式 -->
      <el-card class="-mt-4" shadow="never">
        <div>
          <span class="mr-2"> {{ isDark ? "黑暗模式" : "白天模式" }} </span>
          <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
        </div>
      </el-card>
      <!-- 设置后端地址 -->
      <el-card class="my-4" shadow="never">
        <div>
          <span class="mr-2">后端地址</span>
          <el-input v-model="newURL" class="my-4" placeholder="请输入后端地址"  />
          <el-button class="bg-blue-400 dark:bg-blue-600" type="primary" @click="changeUrl">设置</el-button>
        </div>
      </el-card>
      <!-- 清除浏览器数据库 -->
      <el-card shadow="never">
        <div>
          <div class="mr-2 mb-2">清除浏览器数据库</div>
          <el-button class="bg-red-400 dark:bg-red-600" type="danger" @click="handleClearMessageData">清除</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Document,
  ChatDotRound,
  HomeFilled,
  SwitchFilled,
  Tools,
  Sunny,
  Moon,
  Fold,
  Expand
} from '@element-plus/icons-vue'
import { useDark, useToggle } from "@vueuse/core";
import { clearMessageData } from '@/database/db';
import { ElMessageBox, ElNotification  } from 'element-plus';
import axios from 'axios';
const dialogVisuable = ref(false);
const newURL=ref()
const isDark = useDark();
const toggleDark = useToggle(isDark);

const isCollapse = ref(true);

const changeUrl= ()=>{
  axios.defaults.baseURL=newURL.value;
    // .then(() => {
      ElNotification.success({
        title: '成功',
        message: '后端地址保存成功'
      });
    // })
    // .catch(() => {
    //   ElNotification.error({
    //     title: '失败',
    //     message: '后端地址保存失败'
    //   });
    // });
}

const handleClearMessageData = () => {
  ElMessageBox.confirm(
    '确认删除所有本地对话记录吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }
  )
  .then(() => {
    clearMessageData();
    ElMessageBox.alert('删除成功', '提示', {
      confirmButtonText: '确定',
      type: 'success'
    })
    .catch(() => {
      ElMessageBox.alert('删除失败', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
    });
  })
}
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