<template>
    <el-button text @click="open">Enter License Key</el-button>
  </template>
  
  <script lang="ts" setup>
  import { ElMessage, ElMessageBox } from 'element-plus'
  
  const open = () => {
    ElMessageBox.prompt('Please Enter your License Key ', 'Enter License Key', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:
      /^[a-zA-Z0-9]+$/,
      inputErrorMessage: 'Invalid Key',
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
  
