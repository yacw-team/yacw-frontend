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
import {db} from "@/database/db"
import { useRouter } from "vue-router";

interface ChatConversation {
  chatId: string;
  title: string;
}

const isCollapsed = ref(false);
const searchText = ref("");

const reversedConversations = computed(() => {
  return conversations.value.slice().reverse();
});

const conversations = ref<ChatConversation[]>([]);

onMounted(async () => {
  (newTitle.changeTitle as string) = "新对话";

  await db.open();
  const data = await db.messagetitles.toArray();
  console.log(data)

  if (data.length != 0) {
    console.log(data)
    data.forEach((msgtitle) => {
      conversations.value.push({
        chatId: msgtitle.chatId,
        title: msgtitle.title,
      });
    });
  }
});
const handleAddNewChat = () => {
  const newConversation: ChatConversation = {
    chatId: "-1" + conversations.value.length,
    title: "新对话",
  };
  conversations.value.push(newConversation);
};

let newTitle = defineProps({
  changeTitleId: String,
  changeTitleIndex: Number,
  changeTitle: String,
});

const router = useRouter();
watch(
  () => newTitle.changeTitle,
  (newval) => {
    console.log(newTitle);
    if (
      newTitle.changeTitleIndex != undefined &&
      newTitle.changeTitleId != undefined
    ) {
      conversations.value[newTitle.changeTitleIndex].chatId =
        newTitle.changeTitleId;
      conversations.value[newTitle.changeTitleIndex].title = newval as string;
      router.push({
        name: "chat",
        params: { id: conversations.value[newTitle.changeTitleIndex].chatId },
      });
      location.reload();
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
