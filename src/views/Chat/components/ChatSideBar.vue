<template>
  <div v-show="!isCollapsed">
    <el-input v-model="searchText" placeholder="搜索标题"></el-input>
    <el-divider></el-divider>
    <el-button class @click="handleAddNewChat">新建对话</el-button>
    <div>
      <div v-for="(conversation, index) in reversedCoversations" :key="index">
        <createNewChat
          :title="conversation.title"
          :chatID="conversation.chatID"
          :index="conversations.length - index - 1"
          :updateItems="updateItems"
        />
        <el-button @click="showDialog(index)">🗑</el-button>
        <el-dialog v-model="isDialogOpen" @close="closeDialog">
          <h2>是否要删除?</h2>
          <template #footer>
            <el-button @click="deleteComponent">是</el-button>
            <el-button @click="closeDialog">否</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, onMounted, watch } from "vue";
import createNewChat from "./createNewChat.vue";

interface ChatConversation {
  chatID: string;
  title: string;
}
const isDialogOpen = ref(false);
const selectedComponentIndex = ref(-1);
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

const showDialog = (index: number) => {
  selectedComponentIndex.value = index;
  isDialogOpen.value = true;
};

const deleteComponent = () => {
  if (
    selectedComponentIndex.value >= 0 &&
    selectedComponentIndex.value < conversations.value.length
  ) {
    conversations.value.splice(selectedComponentIndex.value, 1);
  }
  closeDialog();
};

const closeDialog = () => {
  selectedComponentIndex.value = -1;
  isDialogOpen.value = false;
};
</script>
