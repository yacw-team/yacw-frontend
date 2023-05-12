<template>
  <div class="flex flex-row bg-gray-50">
    <ChatSideBar
      class="w-1/4 px-4 py-2 bg-white border border-gray-200 rounded-md"
      :changeTitleId="changeTitle.id"
      :changeTitleIndex="changeTitle.index"
      :changeTitle="changeTitle.title"
    />
    <div class="flex flex-col w-3/4">
      <div
        id="chat-messages"
        class="flex-1 mx-4 overflow-y-scroll no-scrollbar"
      >
        <div
          v-for="(message, index) in messages[indexnumber].messages"
          :key="index"
        >
          <ChatMessage
            class="mb-2"
            :role="message.type"
            :chatContent="message.content"
          />
        </div>
      </div>
      <div id="input-slot" class="flex flex-row mx-4 my-6">
        <el-input
          v-model="textarea"
          :disabled="isLoading"
          placeholder="请输入"
        />
        <el-button
          class="ml-4"
          type="primary"
          :disabled="!textarea"
          @click="sendmessage"
        >
          <div class="flex flex-row items-center">
            <span>发送</span>
            <el-icon class="ml-1"><ArrowRightBold /></el-icon>
          </div>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ChatSideBar from "./components/ChatSideBar.vue";
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import { ArrowRightBold } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { db } from "@/database/db";

import ChatMessage from "./components/ChatMessage.vue";

const messages: Ref<Chat[]> = ref([]);

const isLoading = ref(false);

let textarea = ref("");

interface getchat {
  chatId: string;

  content: {
    user: string;
    assistant: string;
  };
}

interface firstchat {
  chatId: string;
  modelId: string;
  content: {
    personalityId: string;
    promptsId: string;
    user: string; // user input
    assistant: string;
    title: string;
  };
}

interface ChangeTitle {
  index: number;
  id: string;
  title: string;
}
let changeTitle = ref<ChangeTitle>({
  index: -1,
  id: "",
  title: "",
});

interface Message {
  type: string;
  content: string;
}

interface Chat {
  chatId: string;
  messages: Message[];
}

async function sendmessage() {
  if (apikey.value != "" && model.value != "") {
    const userMessage: Message = {
      type: "user",
      content: textarea.value,
    };
    messages.value[indexnumber.value].messages.push(userMessage);

    isLoading.value = true;

    if (messages.value[indexnumber.value].messages.length == 1) {
      //第一次发送时
      axios
        .post("/api/v1/chat/new", {
          apiKey: apikey.value,
          modelId: model.value,
          content: {
            personalityId: "1", //构造system
            user: textarea.value, // user input
          },
        })
        .then(async (response) => {
          let firstchat: firstchat = response.data;
          changeTitle.value.index = indexnumber.value;
          changeTitle.value.id = firstchat.chatId;
          changeTitle.value.title = firstchat.content.title;
          try {
            await db.open();
            db.messagetitles.add({
              chatId: firstchat.chatId,
              title: firstchat.content.title,
            });
            db.messages.add({
              chatId: firstchat.chatId,
              userContent: firstchat.content.user,
              assistantContent: firstchat.content.assistant,
            });
          } finally {
            db.close();
          }
          messages.value[indexnumber.value].chatId = firstchat.chatId;
          messages.value[indexnumber.value].messages.push({
            type: "assistant",
            content: firstchat.content.assistant,
          });
        });
    } else {
      //多次发送时
      axios
        .post("/api/v1/chat/chat", {
          apiKey: apikey.value,
          chatId: messages.value[indexnumber.value].chatId,
          content: {
            user: textarea.value,
          },
        })
        .then(async (response) => {
          let getchat = response.data;
          const assistantmessage: Message = {
            type: "assistant",
            content: getchat.content.assistant,
          };
          try {
            await db.open();
            db.messages.add({
              chatId: getchat.chatId,
              userContent: getchat.content.user,
              assistantContent: getchat.content.assistant,
            });
          } finally {
            db.close();
          }

          messages.value[indexnumber.value].messages.push(assistantmessage);
        });
    }

    //下面是模拟发送直接改index为2的chat的标题
    isLoading.value = false;
    textarea.value = "";
  } else {
    //缺乏apikey的dialog
    alert("没输入apikey和选择模型，请选择");
  }
}

const apikey = ref("");
const model = ref("");

const route = useRoute();
type indexnumber = number;
// eslint-disable-next-line no-redeclare
const indexnumber = ref(0); //作为具体哪个chatid

watch(
  () => route.params.id,
  (newid) => {
    const contentid = newid;
    for (let i = 0; i < messages.value.length; i++) {
      if (messages.value[i].chatId == contentid) {
        indexnumber.value = i;
        return;
      }
    }
    const newmessage = {
      chatId: route.params.id as string,
      messages: [],
    };
    messages.value.push(newmessage);
    indexnumber.value = messages.value.length - 1;
  }
);

const count = ref(0);
const load = () => {
  if (count.value < messages.value[indexnumber.value].messages.length) {
    count.value += 1;
  }
};

onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apikey.value = firtRecord.apikey as string;
      model.value = firtRecord.model as string;
    }

    console.log(firtRecord);

    if ((await db.messages.toArray()).length != 0) {
      const chatIds = await db.messages.orderBy("chatId").uniqueKeys();
      for (const chatid of chatIds) {
        const messagesForChat = await db.messages
          .where("chatId")
          .equals(chatid)
          .toArray();
        const messages1: Chat = {
          chatId: chatid.toString(),
          messages: [],
        };
        messagesForChat.forEach((message) => {
          messages1.messages.push({
            type: "user",
            content: message.userContent,
          });
          messages1.messages.push({
            type: "assistant",
            content: message.assistantContent,
          });
        });
        messages.value.push(messages1);
      }
    }
  } finally {
    db.close();
  }
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
