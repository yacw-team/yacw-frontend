<template>
  <div class="sidebar-container">
    <el-menu :collapsed="isCollapsed" default-active="1">
      <router-link to="/conversation/1">
        <el-menu-item index="1">
          <i :class="isCollapsed ? 'el-icon-s-home' : 'el-icon-s-management'">
            <router-link to="/conversation">
              <ChatRound />
            </router-link>
          </i>
          <span>{{ isCollapsed ? "" : "Conversation" }}</span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="2">
        <i :class="isCollapsed ? 'el-icon-s-flag' : 'el-icon-s-platform'">
          <Help />
        </i>
        <span>{{ isCollapsed ? "" : "PsychologyConversation" }}</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i :class="isCollapsed ? 'el-icon-s-custom' : 'el-icon-data-analysis'">
          <SwitchFilled />
        </i>
        <span>{{ isCollapsed ? "" : "Game" }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i :class="isCollapsed ? 'el-icon-s-comment' : 'el-icon-phone-outline'">
          <Document />
        </i>
        <span>{{ isCollapsed ? "" : "Translation" }}</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i :class="isCollapsed ? 'el-icon-s-promotion' : 'el-icon-picture'">
          <HomeFilled />
        </i>
        <span>{{ isCollapsed ? "" : "Home" }}</span>
      </el-menu-item>
    </el-menu>
    <el-button
      style="border: none"
      class="collapse-btn"
      :icon="isCollapsed ? 'Expand' : 'Fold'"
      @click="toggleCollapse"
      circle
    ></el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, inject } from "vue";
import { ChatRound, Help, SwitchFilled, Document, HomeFilled } from "@element-plus/icons-vue";
import axios from "axios";

interface ChatConversation {
  chatID: string;
  title: string;
}

const isCollapsed = ref(false);
const conversations = reactive<ChatConversation[]>([
  { chatID: "1", title: "1" },
  { chatID: "2", title: "2" },
  { chatID: "3", title: "112d1d112" },
]);

async function fetchData() {
  try {
    const response = await axios.get("/v1/chat/getchat");
    conversations.length = 0; // clear existing array
    conversations.push(...response.data); // add new conversation objects
  } catch (error) {
    console.error(error);
  }
}

function toggleCollapse(): void {
  isCollapsed.value = !isCollapsed.value;
}

const newindex = inject<number>("newindex");
const newid = inject<string>("newid");
const newtitle = inject<string>("newtitle");

watch(
  () => newindex,
  (newval) => {
    console.log("values change", newindex, newid, newtitle);
    if (newval != undefined && newid != undefined && newtitle != undefined) {
      conversations[newval].chatID = newid;
      conversations[newval].title = newtitle;
    }
  }
);

fetchData();
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

.sidebar-footer {
  position: relative;
  margin-top: auto;
  padding: 20px;
  transition: all 0.2s ease;
}
.sidebar-footer {
  margin-top: auto;
  padding: 20px;
  transition: all 0.2s ease;
  position: relative;
}
.footer-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.collapse-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.conversation-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.conversation-title {
  font-weight: bold;
  margin-right: 10px;
}

.conversation-latest {
  color: #999;
  font-size: 12px;
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

  .footer-icons {
    margin-top: 0;
    margin-left: auto;
  }

  .conversation-list {
    margin-left: 20px;
  }
}

.createchat {
  padding: 10px 0;
  width: 100%;
  background-color: rgb(25, 30, 59);
  font-size: large;
  font-weight: bolder;
  margin-bottom: 10%;
}

.flex {
  display: flex;
  align-items: center;
}
</style>
