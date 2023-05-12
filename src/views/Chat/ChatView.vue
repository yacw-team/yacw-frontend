<template>

  <div class="flex flex-row">
    <ChatSideBar
      class="pr-4"
      :changeTitleId="changeTitle.id"
      :changeTitleIndex="changeTitle.index"
      :changeTitle="changeTitle.title"
    />
    <div class="content">
      <div class="chat">
        <div v-infinite-scroll="load" class="messagecontent">
          <div v-if="messages[indexnumber]">
            <div v-for="(message1, index) in messages[indexnumber].messages" :key="index">
              <el-text
                :class="differentUser(message1.type)"
                :style="{ 'max-width': '300px' }"
              >{{ message1.content }}</el-text>
            </div>
          </div>
          <div v-else>Loading...</div>
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
        <el-button :span="1" :disabled="!textarea" @click="sendmessage">
          {{ send }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ChatSideBar from "./components/ChatSideBar.vue";
import { ref, watch, provide, defineProps, onMounted, type Ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { db } from "../../database/db";

const send = "✈";
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
function differentUser(i: string) {
  if (i == "user") {
    return "user";
  } else {
    return "assistant";
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
const load = ref(() => {
  if (count.value < messages.value[indexnumber.value].messages.length) {
    count.value += 1;
  }
});
const messages: Ref<Chat[]> = ref([]);

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
// const messages = ref([
//   {
//     chatId: "1",
//     messages: [
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你sha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//     ],
//   },
//   {
//     chatId: "2",
//     messages: [
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你hsssssa1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//     ],
//   },
//   {
//     chatId: "3",
//     messages: [
//       {
//         type: "assistant",
//         content: "还说c你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//       {
//         type: "user",
//         content: "你ha1",
//       },
//       {
//         type: "assistant",
//         content: "还说你是擦",
//       },
//     ],
//   },
// ]);
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
