<template>
  <div class="sidebar-container">
    <el-menu :collapsed="isCollapsed" default-active="1">
      <router-link to="/">
        <el-menu-item index="1">
          <i :class="isCollapsed ? 'el-icon-s-promotion' : 'el-icon-picture'">
            <HomeFilled />
          </i>
          <span>{{ isCollapsed ? "" : "主页" }}</span>
        </el-menu-item>
      </router-link>
      <router-link to="/chat/1">
        <el-menu-item index="2">
          <i :class="isCollapsed ? 'el-icon-s-home' : 'el-icon-s-management'">
            <ChatRound />
          </i>
          <span>{{ isCollapsed ? "" : "聊天" }}</span>
        </el-menu-item>
      </router-link>
      <router-link to="/translate">
        <el-menu-item index="3">
          <i
            :class="isCollapsed ? 'el-icon-s-comment' : 'el-icon-phone-outline'"
          >
            <Document />
          </i>
          <span>{{ isCollapsed ? "" : "翻译" }}</span>
        </el-menu-item>
      </router-link>
      <div @click="handleUnderConstruction">
        <el-menu-item index="4">
          <i :class="isCollapsed ? 'el-icon-s-flag' : 'el-icon-s-platform'">
            <Help />
          </i>
          <span>{{ isCollapsed ? "" : "心理咨询" }}</span>
        </el-menu-item>
      </div>
      <div @click="handleUnderConstruction">
        <el-menu-item index="5">
          <i
            :class="isCollapsed ? 'el-icon-s-custom' : 'el-icon-data-analysis'"
          >
            <SwitchFilled />
          </i>
          <span>{{ isCollapsed ? "" : "游戏" }}</span>
        </el-menu-item>
      </div>
    </el-menu>
    <el-button
      style="border: none"
      class="collapse-btn"
      @click="toggleCollapse"
      circle
    >
      <el-icon
        ><Expand v-if="isCollapsed" /><Fold v-if="!isCollapsed"
      /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ChatRound,
  Help,
  SwitchFilled,
  Document,
  HomeFilled,
  Expand,
  Fold,
} from "@element-plus/icons-vue";
import { ElButton, ElMessage } from "element-plus";
import 'element-plus/es/components/message/style/css'

const isCollapsed = ref(false);

function toggleCollapse(): void {
  isCollapsed.value = !isCollapsed.value;
}

const handleUnderConstruction = () => {
  ElMessage('功能开发中，敬请期待！')
}
</script>

<style scoped>
.sidebar-container {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  border-left: 1px solid #ccc;
  padding-top: 50px;
}
.collapse-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

@media (min-width: 960px) {
  .sidebar-container {
    flex-direction: row;
  }

  el-menu {
    width: 200px;
  }

  el-menu-item {
    display: flex;
    align-items: center;

    justify-content: center;
  }

  el-menu-item i {
    font-size: 16px;
    margin-right: 0;
  }

  el-menu-item span {
    display: inline-block;
    margin-left: 5px;
    white-space: nowrap;
  }
}
</style>
