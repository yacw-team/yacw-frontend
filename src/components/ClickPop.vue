<template>
  

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  
  >
    <span>Verifying failed ,please try again</span>
    <template #footer>
      <span class="dialog-footer">
        
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>