<template>
  <el-dialog v-model="$props.dialogVisiable" width="40%" title="添加文体">
    <div>
      <div class="flex items-center justify-center mb-4">
        <span class="flex-none pl-8 pr-1">文体名称</span>
        <el-popover
          placement="right"
          title="情感名称"
          :width="200"
          trigger="hover"
          content="您将如何称呼这种翻译文体？这将协助您找到您需要的文体。例如：记叙文体。"
        >
          <template #reference>
            <el-icon class="pb-1 mr-4"><InfoFilled /></el-icon>
          </template>
        </el-popover>
        <span class="flex-auto pr-8"><el-input v-model="styleTitle" /></span>
      </div>
      <div class="flex items-center justify-center mb-4">
        <span class="flex-none pl-8 pr-1">文体内容</span>
        <el-popover
          placement="right"
          title="文体内容"
          :width="200"
          trigger="hover"
          content="您将如何描述这种翻译文体？这将指导模型进行翻译。我们推荐使用英文来定义。例如：poetic."
        >
          <template #reference>
            <el-icon class="pb-1 mr-4"><InfoFilled /></el-icon>
          </template>
        </el-popover>
        <span class="flex-auto pr-8"><el-input v-model="styleValue" /></span>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <el-button class="mx-4">取消</el-button>
      <el-button class="mx-4" type="primary" plain @click="hangleSubmitStyle"
        >提交</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

defineProps({
  dialogVisiable: Boolean,
});

const emit = defineEmits<{
  (e: "submitStyle", styleTitle: string, styleValue: string): void;
}>();

const styleTitle = ref("");
const styleValue = ref("");

const hangleSubmitStyle = () => {
  emit("submitStyle", styleTitle.value, styleValue.value);
};
</script>
