<template>
  <div class="flex">
    <SideBar class="sidebar" />
    <ChatSideBar />
    <div class="content">
      <div class="chat">
        <div v-infinite-scroll="load" class="messagecontent">
          <div
            v-for="(message1, index) in messages[indexnumber].messages"
            :key="index"
          >
            <el-text
              :class="differentUser(message1.type)"
              :style="{ 'max-width': '300px' }"
              >{{ message1.content }}</el-text
            >
          </div>
        </div>
      </div>
      <div class="sendchat">
        <el-input
          v-model="textarea"
          :rows="3"
          type="textarea"
          :disabled="isLoading"
          placeholder="请输入"
          :span="23"
        />
        <el-button :span="1" :disabled="!textarea" @click="sendmessage">{{
          send
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ChatSideBar from "./components/ChatSideBar.vue";
import { ref, watch, provide } from "vue";
import { useRoute } from "vue-router";

const send = "✈";
const isLoading = ref(false);

let textarea = ref("");

interface getchat {
  chatId: string;

  content: {
    user: string;
    assistant: string;
  };
  id: {
    usermsgid: string;
    assmsgid: string;
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

async function sendmessage() {
  const userMessage: Message = {
    type: "user",
    content: textarea.value,
  };
  messages.value[indexnumber.value].messages.push(userMessage);

  textarea.value = "";

  isLoading.value = true;

  //下面是模拟发送直接改index为2的chat的标题
  (changeTitle.value.index = 2),
    (changeTitle.value.id = "1"),
    (changeTitle.value.title = "你好新对话"),
    provide("newindex", changeTitle.value.index);
  provide("newid", changeTitle.value.id);
  provide("newtitle", changeTitle.value.title);

  isLoading.value = false;
}

function differentUser(i: string) {
  if (i == "user") {
    return "user";
  } else {
    return "assistant";
  }
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
    indexnumber.value = messages.value.length-1;
  }
);

const count = ref(0);
const load = () => {
  if (count.value < messages.value[indexnumber.value].messages.length) {
    count.value += 1;
  }
};

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
.flex {
  display: flex;
}
.sidebar {
  flex: 1;
}
.content {
  flex: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.user {
  border-radius: 5px;
  background-color: #8bc34a;
  display: flex;

  justify-self: flex-end;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 20px;
  font-size: larger;
  color: #212121;
}
.assistant {
  border-radius: 5px;
  display: flex;
  justify-self: flex-start;
  margin-left: 20px;
  margin-right: auto;
  max-width: 150px;
  width: auto;
  background-color: #9e9e9e;
  font-size: larger;
  color: #212121;
  margin-bottom: 20px;
}

.chat {
  height: 80%; /* 设置高度为视口高度的80% */
  background-color: #f5f5f5;
}
.sendchat {
  display: flex;
  height: 20%;
}
.messagecontent {
  height: 800px; /* 设置固定的高度 */
  overflow-y: scroll; /* 启用竖向滚动条 */
}
.auto-width {
  width: auto;
}
</style>
