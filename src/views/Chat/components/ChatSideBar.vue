<template>
  <div v-show="!isCollapsed">
    <el-input v-model="searchText" placeholder="搜索标题"></el-input>
    <el-divider></el-divider>
    <el-button class @click="handleAddNewChat">新建对话</el-button>
    <div>
      <div v-for="(conversation, index) in reversedCoversations" :key="index">
        <createNewChat
          :title="conversation.title"
          :chatID="conversation.chatId"
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
import { useRouter } from "vue-router";
import createNewChat from "./createNewChat.vue";
import {db} from "../../../database/db"


interface ChatConversation {
  chatId: string;
  title: string;
}
const isDialogOpen = ref(false);
const selectedComponentIndex = ref(-1);
const isCollapsed = ref(false);
const searchText = ref("");


const reversedCoversations = computed(() => {
  return conversations.value.slice().reverse();
});

const conversations = ref<ChatConversation[]>([
]);
onMounted(()=>async () => {
  await db.open()
  if((await db.messagetitles.toArray()).length !=0){
    const data =await db.messagetitles.toArray();
    data.forEach(
      (msgtitle)=>{
        conversations.value.push({
          chatId:msgtitle.chatId,
          title:msgtitle.title,
        })
      }
    )
  }
})

const handleAddNewChat = () => {
  const newConversation: ChatConversation = {
    chatId: "-1" + conversations.value.length,
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
      router.push({ name: "chat", params: { id: conversations.value[newTitle.changeTitleIndex].chatId } });
      location.reload();
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
    conversations.value.splice(conversations.value.length-selectedComponentIndex.value-1, 1);
  }
  closeDialog();
};

const closeDialog = () => {
  selectedComponentIndex.value = -1;
  isDialogOpen.value = false;
};
</script>
