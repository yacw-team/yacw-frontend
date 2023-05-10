<template>

  <div class="chatgpt">
    <SideBar style="padding-top:10px;"/>
      <div class="chatgpt-api">
        <h1 class="chatgpt-heading">Get started with ChatGPT API</h1>
        <div class="chatgpt-api-input">
    
            <div class="enter-key"><EnterKey /></div>
           

          
        </div>
      </div>
    <el-main class="chatgpt-main">
      <div class="chatgpt-banner">
        <el-card style="width:300px;height:300px;">
          <template #header>
            <div class="card-header">
              <span>
                <div style="width:30px;height:30px;">
                  <Coin />
                </div>
                <p class="p-card-header">免费开源</p>
              </span>
            </div>
          </template>
          <div>
            <p class="card-detail">
              是一款完全免费的开源聊天机器人项目，旨在帮助开发人员快速构建功能强大的聊天应用程序。
            </p>
          </div>
        </el-card>

        <el-card style="width:300px;height:300px;">
          <template #header>
            <div class="card-header">
              <span>
                <div style="width:30px;height:30px;">
                  <User />
                </div>
                <p class="p-card-header">注重隐私</p>
              </span>
            </div>
          </template>
          <div>
            <p class="card-detail">
              我们非常注重用户隐私和数据保护，chatgpt不会收集任何敏感信息，并采取了多种措施确保所有数据的安全性。
            </p>
          </div>
        </el-card>

        <el-card style="width:300px;height:300px;">
          <template #header>
            <div class="card-header">
              <span>
                <div style="width:30px;height:30px;">
                  <MagicStick />
                </div>
                <p class="p-card-header">体验良好</p>
              </span>
            </div>
          </template>
          <div>
            <p class="card-detail">
              chatgpt基于最先进的自然语言处理技术开发而成，能够以流畅、自然的方式与用户交互，提供令人满意的使用体验。
            </p>
          </div>
        </el-card>
      </div>

      
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EnterKey from "../components/EnterKey.vue"
import SideBar from '../components/SideBar.vue'



// const open = () => {
//   if (apiKey.value) {
//     router.push('/v1/chat');
//   } else {
//     dialogVisible.value = true;
//   }
// };
 

</script>

<style scoped>
.chatgpt
{
    position:relative;
    
}
.chatgpt-banner {
  text-align: center;
  padding-top: 80px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.chatgpt-api {
  text-align: center;
  margin-top: 50px;
}

.chatgpt-api-input {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.p-card-header {
  font-size: 30px;
  font-weight: bold;
}
.chatgpt-heading
{
    font-size:40px;
    font-weight:bold;
}
.card-detail {
  line-height: 40px;
  text-align: left;
}
.button-save
{
    padding-top:30px;
    padding-right:20px;
    color:red;
}
.button-api
{
    background-color:#9cdcf0;
    border:none;
    color:white;
}
.button-api:hover {
  background-color: #7cb8d9;
}

.button-save-text 
{
    color:blue;
}
.button-cancel
{
    border:none;
    
}
.enter-key
{
  padding-top:98px;
  padding-right:30px;
}
</style>
