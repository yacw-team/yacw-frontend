<template>
<div class="sidebar-container">
<el-menu :collapsed="isCollapsed" default-active="1">
 <router-link  to="/conversation/1">
    <el-menu-item index="1">
      <i  :class="isCollapsed ? 'el-icon-s-home' : 'el-icon-s-management'" > <router-link to='/conversation'> <ChatRound /></router-link> </i>
<span>{{ isCollapsed ? '' : 'Conversation' }}</span> 
    </el-menu-item>
    </router-link>
    <el-menu-item index="2">
        <i :class="isCollapsed ? 'el-icon-s-flag' : 'el-icon-s-platform'"><Help /></i>
<span>{{ isCollapsed ? '' : 'PsychologyConversation' }}</span>
    </el-menu-item>
    <el-menu-item index="3">
        <i :class="isCollapsed ? 'el-icon-s-custom' : 'el-icon-data-analysis'"><SwitchFilled /></i>
<span>{{ isCollapsed ? '' : 'Game' }}</span>
    </el-menu-item>
    <el-menu-item index="4">
        <i :class="isCollapsed ? 'el-icon-s-comment' : 'el-icon-phone-outline'"><Document /></i>
<span>{{ isCollapsed ? '' : 'Translation' }}</span>
    </el-menu-item>
    <el-menu-item index="5">
        <i :class="isCollapsed ? 'el-icon-s-promotion' : 'el-icon-picture'"><HomeFilled /></i>
<span>{{ isCollapsed ? '' : 'Home' }}</span>
    </el-menu-item>
</el-menu>
    <!-- <div class="sidebar-footer" v-show="!isCollapsed">
        <el-input v-model="searchText" placeholder="搜索标题"></el-input>
        <el-divider></el-divider>
        <div class="conversation-list">
        <div class="conversation-item" v-for="conversation in filteredConversations" :key="conversation.title">
        <div class="conversation-title">{{ conversation.SystemPrompt }}</div>
        <div class="conversation-latest">{{ conversation.Uid   }}</div>
    </div>
</div>
    
</div> -->
        <el-button style="border:none;" class="collapse-btn" :icon="isCollapsed ? 'Expand' : 'Fold'" @click="toggleCollapse" circle></el-button>
</div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import axios from 'axios';
import {ElMenu,ElMenuItem,ElInput,ElDivider,ElButton,ElIcon,ElSwitch,} from "element-plus";
interface ChatConversation {
    Id              :number
	SystemPrompt    :string
	Uid             :string
	ModelId         :number
	PromptId        :number
}

const isCollapsed = ref(false);
const conversations = reactive<ChatConversation[]>([
  { SystemPrompt: "p1", Uid  : "1" ,Id:"1",ModelId:"1",PromptId:"1"},
  { SystemPrompt: "p2", Uid  : "2" ,d:"2",ModelId:"2",PromptId:"2"},
  { SystemPrompt: "对话3标题", Uid  : "3" ,Id:"3",ModelId:"3",PromptId:"3"},
]);
const searchText = ref("");

const filteredConversations = computed(() => {
  return conversations.filter((conversation) =>
        conversation.Uid.toLowerCase().includes(searchText.value.toLowerCase()) // 修改搜索条件为Uid
                            );
                                            });

async function fetchData() {
  try {
    const response = await axios.get('url');
    conversations.length = 0; // clear existing array
    conversations.push(...response.data); // add new conversation objects
  } catch (error) {
    console.error(error);
  }
}

function toggleCollapse(): void {
    isCollapsed.value = !isCollapsed.value;
}

fetchData();

</script>

<style scoped>
    .sidebar-container
         {
        position:fixed;
        display: flex;
        height:100%;
        width:30%;
        flex-direction: column;
        border-left: 1px 0 solid #ccc; padding-top:50px;
        }

    .sidebar-footer 
    {
        position:relative;
        margin-top: auto;
        padding: 20px;
        transition: all 0.2s ease;
    }
    .sidebar-footer 
    {
        margin-top: auto;
        padding: 20px;
        transition: all 0.2s ease;
        position: relative;
    }
    .footer-icons
     {
        display: flex;
        justify-content: space-between;
    margin-top: 15px;
    }

    .collapse-btn 
    {
        position: absolute;
         top: 0;
        left: 0;
        z-index: 1;
    }

    .conversation-item 
    {
        display:flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .conversation-title
     {
        font-weight: bold;
        margin-right: 10px;
    }

    .conversation-latest 
    {
        color: #999;
        font-size: 12px;
    }
    
    @media (min-width: 960px)
     {
        .sidebar-container {
            flex-direction: row;
                            }

        el-menu {
            width: 200px;
                }

        el-menu-item
         {
              
            display: flex;
            align-items: center;
            
            justify-content: center;
        }

        el-menu-item i 
        {
           
            font-size: 16px;
            margin-right: 0;
            
        }

        el-menu-item span {
            display: inline-block;
            margin-left: 5px;
            white-space: nowrap;
            
                            }
    .el-menu.el-menu--vertical
        {
            padding-top:350px;
        }
    .footer-icons {
        margin-top: 0;
        margin-left: auto;
    }

    .conversation-list
     {
        margin-left: 20px;
        }
    }
   
</style>