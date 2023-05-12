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
import { ref, watch } from "vue";
import { ArrowRightBold } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import axios from "axios";

import ChatMessage from "./components/ChatMessage.vue";

const isLoading = ref(false);

let textarea = ref("");

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

async function sendmessage() {
  const userMessage: Message = {
    type: "user",
    content: textarea.value,
  };
  messages.value[indexnumber.value].messages.push(userMessage);

  textarea.value = "";

  isLoading.value = true;

  if (messages.value[indexnumber.value].messages.length == 0) {
    //第一次发送时
    axios
      .post("/v1/chat/new", {
        apiKey: "string",
        modelId: "string,+8",
        content: {
          personalityId: "string", //构造system
          promptsId: "string",
          user: textarea.value, // user input
        },
      })
      .then((response) => {
        let firstchat: firstchat = response.data;
        changeTitle.value.index = indexnumber.value;
        changeTitle.value.id = firstchat.chatId;
        changeTitle.value.title = firstchat.content.title;
      });
  } else {
    //多次发送时
    axios
      .post("/api/v1/chat/chat", {
        apiKey: "string",
        chatId: "111",
        content: {
          user: textarea.value,
        },
      })
      .then((response) => {
        let getchat = response.data;
        const assistantmessage: Message = {
          type: "assistant",
          content: getchat.content.assistant,
        };
        messages.value[indexnumber.value].messages.push(assistantmessage);
      });
  }

  //下面是模拟发送直接改index为2的chat的标题
  isLoading.value = false;
}

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

const messages = ref([
  {
    chatId: "1",
    messages: [
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你sha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
    ],
  },
  {
    chatId: "2",
    messages: [
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你hsssssa1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
    ],
  },
  {
    chatId: "3",
    messages: [
      {
        type: "assistant",
        content: "还说c你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
      {
        type: "user",
        content: "你ha1",
      },
      {
        type: "assistant",
        content: "还说你是擦",
      },
    ],
  },
]);
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
