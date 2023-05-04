<template>
    <el-button text @click="open" round style="background-color: bisque;">Enter License Key</el-button>
  </template>
  
  <script lang="ts" setup>
  import { ElMessage, ElMessageBox } from 'element-plus'
  
  const open = () => {
    ElMessageBox.prompt('请输入 ', 'Enter License Key', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:
      /^[a-zA-Z0-9]+$/,
      inputErrorMessage: 'Invalid Key',
      inputPlaceholder:'Please Enter your License Key',
      center:true,
      
    })
      .then(({ value }) => {
        ElMessage({
          type: 'success',
          message: `Your Key is:${value}`,
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Input canceled',
        })
      })
  }
  </script>

  <style>
 .el-button--primary{
    background-color: rgb(167, 190, 183);
    font:bolder;
  }

  

.el-message-box{
  background-color: rgb(167, 190, 183);

}
  
  </style>
  
