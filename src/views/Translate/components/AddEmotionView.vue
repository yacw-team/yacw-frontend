<template>
  <el-dialog v-model="$props.dialogVisiable" width="40%" title="添加情感">
    <div>
      <div class="flex items-center justify-center mb-4">
        <span class="flex-none pl-8 pr-1">情感名称</span>
        <el-popover
          placement="right"
          title="情感名称"
          :width="200"
          trigger="hover"
          content="您将如何称呼这种翻译情感？这将协助您找到您需要的情感。例如：悲壮的。"
        >
          <template #reference>
            <el-icon class="pb-1 mr-4"><InfoFilled /></el-icon>
          </template>
        </el-popover>
        <span class="flex-auto pr-8"><el-input v-model="emotionTitle" /></span>
      </div>
      <div class="flex items-center justify-center mb-4">
        <span class="flex-none pl-8 pr-1">情感内容</span>
        <el-popover
          placement="right"
          title="情感内容"
          :width="200"
          trigger="hover"
          content="您将如何描述这种翻译情感？这将指导模型进行翻译。我们推荐使用英文来定义。例如：happiness and pleasure."
        >
          <template #reference>
            <el-icon class="pb-1 mr-4"><InfoFilled /></el-icon>
          </template>
        </el-popover>
        <span class="flex-auto pr-8"><el-input v-model="emotionValue" /></span>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <el-button class="mx-4">取消</el-button>
      <el-button class="mx-4" type="primary" plain @click="hangleSubmitEmotion"
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
  (e: "submitEmotion", emotionTitle: string, emotionValue: string): void;
}>();

const emotionTitle = ref("");
const emotionValue = ref("");

const hangleSubmitEmotion = () => {
  emit("submitEmotion", emotionTitle.value, emotionValue.value);
};
</script>
