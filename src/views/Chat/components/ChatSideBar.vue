<template>
  <div v-show="!isCollapsed">
    <el-button class="w-full my-4 bg-blue-400 dark:bg-black" @click="handleAddNewChat" type="primary">
      <el-icon>
        <Plus class="mb-1" size="20" />
      </el-icon>
      <p class="pl-1 text-base">新建对话</p>
    </el-button>
    <el-input v-model="searchText" placeholder="搜索标题" disabled />
    <el-divider />
    <div>
      <div v-for="(conversation, index) in reversedConversations" :key="index">
        <CreateNewChat
          :title="conversation.title"
          :chatID="conversation.chatId"
          :index="conversations.length - index - 1"
          :updateItems="updateItems"
          @deleteChat="(chatId: string) => handleDeleteChat(chatId)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, onMounted, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import CreateNewChat from "./CreateNewChat.vue";
import { db } from "@/database/db";
import { useRouter } from "vue-router";

import { v4 as uuidv4 } from "uuid";
import { ElMessage } from "element-plus";

interface ChatConversation {
  chatId: string;
  title: string;
}

const isCollapsed = ref(false);
const searchText = ref("");
const hasNewChat = ref(false);

const reversedConversations = computed(() => {
  return conversations.value.slice().reverse();
});

const conversations = ref<ChatConversation[]>([]);

onMounted(async () => {
  (newTitle.changeTitle as string) = "新对话";
  (newTitle.newId as string) = "";

  await db.open();
  const data = await db.messagetitles.toArray();
  console.log(data);

  if (data.length != 0) {
    console.log(data);
    data.forEach((msgtitle) => {
      conversations.value.push({
        chatId: msgtitle.chatId,
        title: msgtitle.title,
      });
    });
  }
  db.close();
});
const handleAddNewChat = () => {
  if (!hasNewChat.value) {
    const newConversation: ChatConversation = {
      chatId: uuidv4(),
      title: "新对话",
    };
    conversations.value.push(newConversation);
    router.push({ name: "chat", params: { id: newConversation.chatId } });
    hasNewChat.value = true;
  } else {
    ElMessage({
      message: "一次只能新建一次新对话",
      type: "warning",
    });
  }
};

watch(
  () => newTitle.newId,
  (newval) => {
    console.log(newTitle.newId);
    const newConversation: ChatConversation = {
      chatId: newTitle.newId as string,
      title: "新对话",
    };
    conversations.value.push(newConversation);
    router.push({ name: "chat", params: { id: newConversation.chatId } });
    hasNewChat.value = true;
  }
);

let newTitle = defineProps({
  changeTitleIndex: Number,
  changeTitle: String,
  newId: String,
});

const router = useRouter();
watch(
  () => newTitle.changeTitle,
  (newval) => {
    console.log(newTitle);
    if (newTitle.changeTitleIndex != undefined) {
      conversations.value[
        newTitle.changeTitleIndex
      ].title = newTitle.changeTitle as string;
      hasNewChat.value = false;
      // router.push({
      //   name: "chat",
      //   params: { id: conversations.value[newTitle.changeTitleIndex].chatId },
      // });
      // location.reload();
    }
  }
);

const updateItems = (index: number, newTitle: string) => {
  conversations.value[index].title = newTitle;
};

const handleDeleteChat = (chatId: string) => {
  const indexToDelete = conversations.value.findIndex(
    (conversation) => conversation.chatId === chatId
  );
  console.log(indexToDelete);
  if (indexToDelete == conversations.value.length - 1) {
    hasNewChat.value = false;
    conversations.value.splice(indexToDelete, 1);
  } else if (indexToDelete !== -1) {
    conversations.value.splice(indexToDelete, 1);
  }
  // router.push({ name: "chat", params: { id: "1" } });
};
</script>
