<template>
  <el-card class="my-2 hover:cursor-pointer"  >
    <div class="flex flex-row items-center justify-center -my-2">
      <div class="flex items-center" @click="handleChatSelect">
        <el-icon size="20">
          <ChatLineSquare />
        </el-icon>
        <span class="w-full mx-2">{{ conversation.title }}</span>
      </div>
      <div class="flex flex-row flex-1">
        <div class="flex flex-row items-center">
          <el-icon class="mr-1" size="16" @click="opendialog">
            <Edit />
          </el-icon>
          <el-icon size="16" @click="handleDeleteChat">
            <Delete />
          </el-icon>
        </div>
        <el-dialog class="px-8" v-model="changeTitleDialogVisiable" center>
          <p class="flex justify-center text-lg">更改标题</p>
          <el-input class="mt-6" v-model="input" :placeholder="conversation.title" />
          <template #footer>
            <el-button class="mx-2" @click="changeTitleDialogVisiable = false">取消</el-button>
            <el-button class="mx-2" type="primary" @click="closedialog">确定</el-button>
          </template>
        </el-dialog>
        <el-dialog width="300" class="px-8" v-model="deleteChatDialogVisiable" center>
          <p class="flex justify-center text-lg">是否删除该对话？</p>
          <p class="flex justify-center mt-4">您将无法恢复对话的内容！</p>
          <template #footer>
            <el-button class="mx-2" @click="deleteChatDialogVisiable = false">取消</el-button>
            <el-button class="mx-2" type="danger" @click="deleteChat">确定</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import type { PropType } from "vue";
import { ChatLineSquare, Edit, Delete } from "@element-plus/icons-vue";
import { el } from "element-plus/es/locale";

const router = useRouter();

const input = ref("");
const changeTitleDialogVisiable = ref(false);
const deleteChatDialogVisiable = ref(false);


const emit = defineEmits<{
  (e: "deleteChat", chatId: string): void;
}>();

const handleChatSelect = () => {
 
  router.push({ name: "chat", params: { id: conversation.chatID } });
};

const opendialog = () => {

    changeTitleDialogVisiable.value = true;
  
};

const closedialog = () => {
  if (conversation.title != input.value) {
    conversation.updateItems(conversation.index as number, input.value);
    input.value = "";
  }
  changeTitleDialogVisiable.value = false;
};

const handleDeleteChat = () => {
 
    deleteChatDialogVisiable.value = true;
  
};

const deleteChat = () => {
  deleteChatDialogVisiable.value = false;
  if (conversation.chatID != undefined) {
    emit("deleteChat", conversation.chatID);
    router.push({ name: "chat", params: { id: "1" } });
  }
};

const conversation = defineProps({
  title: String,
  chatID: String,
  index: Number,

  updateItems: {
    type: Function as PropType<(index: number, newTitle: string) => void>,
    required: true,
  },
});
</script>
