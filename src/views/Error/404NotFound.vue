<template>
  <el-result icon="error" title="404 Not Found" sub-title="请检查您输入的 URL 是否正确">
    <template #extra>
      <el-button type="primary" @click="$router.back()">返回</el-button>
    </template>
  </el-result>
</template>
