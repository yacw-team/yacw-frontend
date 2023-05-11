<template>
  <div v-show="!isCollapsed">
    <el-button class="w-full my-4" @click="handleAddNewChat" type="primary">
      <el-icon>
        <Plus class="mb-1" size="20" />
      </el-icon>
      <p class="pl-1 text-base">新建对话</p>
    </el-button>
    <el-input v-model="searchText" placeholder="搜索标题" disabled />
    <el-divider />
    <div>
      <div v-for="(conversation, index) in reversedCoversations" :key="index">
        <CreateNewChat
          :title="conversation.title"
          :chatID="conversation.chatID"
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

interface ChatConversation {
  chatID: string;
  title: string;
}

const isCollapsed = ref(false);
const searchText = ref("");
const conversations = ref<ChatConversation[]>([
  { chatID: "1", title: "1" },
  { chatID: "2", title: "2" },
  { chatID: "3", title: "3" },
]);

const reversedCoversations = computed(() => {
  return conversations.value.slice().reverse();
});

const handleAddNewChat = () => {
  const newConversation: ChatConversation = {
    chatID: "-1" + conversations.value.length,
    title: "新对话",
  };
  conversations.value.push(newConversation);
};

onMounted(() => {
  (newTitle.changeTitle as string) = "新对话";
  
});

let newTitle = defineProps({
  changeTitleId: String,
  changeTitleIndex: Number,
  changeTitle: String,
});

watch(
  () => newTitle.changeTitle,
  (newval) => {
    console.log(newTitle);
    if (
      newTitle.changeTitleIndex != undefined &&
      newTitle.changeTitleId != undefined
    ) {
      conversations.value[newTitle.changeTitleIndex].chatID =
        newTitle.changeTitleId;
      conversations.value[newTitle.changeTitleIndex].title = newval as string;
    }
  }
);

const updateItems = (index: number, newTitle: string) => {
  conversations.value[index].title = newTitle;
};

const handleDeleteChat = (chatId: string) => {
  console.log("delete" + chatId);
};
</script>
