<template>
  <div>
    <promptShop @changeShow="(msg: boolean) => isVisible = msg" v-if="isVisible"
      @changeShow1="(msg: boolean) => isVisible = msg" @sendPrompt="(msg: string) => textarea = msg" />
    <div v-if="!isVisible" class="flex flex-row h-full">
      <ChatSideBar class="w-1/4 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md"
        :changeTitleIndex="changeTitle.index" :changeTitle="changeTitle.title" :newId="getNewid" />
      <div class="flex flex-col w-3/4 h-full">
        <div class="flex-1 bg-gray-50 dark:bg-black h-1/2">
          <div class="flex flex-col h-full overflow-y-scroll no-scrollbar">
            <div v-if="messages && messages[indexnumber] && indexnumber > -1">
              <div id="chat-messages" class="flex-1 mx-4">
                <div class="my-4" v-for="(message, index) in  displayedMessages" :key="index">
                  <div
                    class="flex flex-row items-start p-4 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-600 rounded-md">
                    <div id="message-avatar" class="flex">
                      <div v-if="message.type == 'user'">
                        <el-image class="w-10 rounded-md" :src="user_avatar" />
                      </div>
                      <div v-else>
                        <el-image class="w-10 rounded-md" :src="assistant_avatar" />
                      </div>
                    </div>
                    <el-skeleton style="width:100% ;padding:10px " :loading="isLoading && firstclick &&
                      index == displayedMessages.length - 1 && message.content == ''" animated :rows="5">
                      <template #template></template>
                      <template #default>
                        <div id="message-content" class="mx-4">
                          <div v-html="chatContentRandered(message.content)"></div>
                        </div>
                      </template>
                    </el-skeleton>
                    <div class="ml-auto absolute top-1 right-1 copy">
                      <i class="el-icon-copy" @click="copyText(message.content)">
                        <el-icon>
                          <CopyDocument />
                        </el-icon>
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <HomePage />
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-4">
          <div class="flex flex-row items-center justify-center w-1/2">
            <div class="flex flex-1">
              <PromptLibrary @response="(msg: string) => textarea += msg" @changeShow="(msg: boolean) => isVisible = msg"
                style="margin: auto" />
            </div>
            <div class="flex flex-1">
              <AICharacter @getCharacter="(msg: Personality) => getCharacterinfo(msg)" style="margin: auto" />
            </div>
          </div>
          <span v-if="isShowCharacter"
            style="background-color: aquamarine; width: fit-content; padding-left: 0.5em; padding-right:0.5em; border-radius: 10px;">
            You
            are select
            <strong>{{ Character.name }}</strong>
          </span>
        </div>
        <div id="input-slot" class="flex flex-row mx-4 my-6">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" resize="none" v-model="textarea"
            :disabled="isLoading" placeholder="请输入对话文字，使用 Shift + Enter 发送消息"
            @keydown.shift.enter.prevent="sendmessage" />
          <el-button class="ml-4" type="primary" :disabled="textarea.length == 0" @click="sendmessage">
            <div class="flex flex-row items-center">
              <span>发送</span>
              <el-icon class="ml-1">
                <ArrowRightBold />
              </el-icon>
            </div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";
import ChatSideBar from "./components/ChatSideBar.vue";
import { ref, watch, onMounted, computed } from "vue";
import type { Ref } from "vue";
import { ArrowRightBold, CopyDocument } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../database/db";
import PromptLibrary from "./components/PromptLibrary.vue";
import promptShop from "@/components/PromptShop.vue";
import AICharacter from "./components/AIcharacter.vue";
import HomePage from "@/views/Chat/ChatHomePage.vue";

import { ElMessage } from "element-plus";
import type { getFirstMessage, getMessage } from "@/api/chat/res";
import type { sendMessage, firstSendMessage, deleteChat } from "@/api/chat/req";
import { getFirst, getmessage, deletemessage } from "@/api/chat/chat";

const messages: Ref<Chat[]> = ref([]);

const isLoading = ref(false);

const firstclick = ref(false);

let textarea = ref("");

const isVisible = ref(false); //组件切换显示
const Character = ref();
const characterid = ref("");

const isShowCharacter = ref(false);

const apikey = ref("");
const model = ref("");

const route = useRoute();

const indexnumber = ref(0); //作为具体哪个chatid

const queryId = ref(""); //判断是不是0或1
const getNewid = ref("");

const user_avatar =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSIjMzMzMzMzIj5Vc2VyPC90ZXh0PiAgIAo8L3N2Zz4=";
const assistant_avatar = "/assistant.jpg";


interface Personality {
  id: string;
  name: string;
  description: string;
  prompts: string;
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

const copyText = (s: string) => {
  navigator.clipboard.writeText(s);
  ElMessage.success("Copied to clipboard!");
};

const chatContentRandered = (s: string) => {

  return DOMPurify.sanitize(marked.parse(s));
}

async function sendmessage() {
  if (apikey.value != "" && model.value != "") {
    if (queryId.value == "0" || queryId.value == "1" || queryId.value == "") {
      //如果是在初始页面时候聊天 或 如果是在删除后聊天
      const newmessage = {
        chatId: uuidv4(),
        messages: [],
      };
      getNewid.value = newmessage.chatId;
      messages.value.push(newmessage);
      indexnumber.value = messages.value.length - 1;
      changeTitle.value.index = indexnumber.value;
    
    }
    //之后聊天在某一对话中发送对话
    const userMessage: Message = {
      type: "user",
      content: textarea.value,
    };
    isLoading.value = true;
    firstclick.value = true;
    messages.value[indexnumber.value].messages.push(userMessage);

    messages.value[indexnumber.value].messages.push({
      type: "assistant",
      content: "",
    });
   

    if (messages.value[indexnumber.value].messages.length == 2) {
      const firstsendmessage: firstSendMessage = {
        apiKey: apikey.value,
        modelId: model.value,
        chatId: messages.value[indexnumber.value].chatId,
        content: {
          personalityId: characterid.value, //构造system
          user: textarea.value, // user input
        },
      };

      //第一次发送时
      textarea.value = "";
      const firstchat: getFirstMessage = await getFirst(firstsendmessage);

      messages.value[indexnumber.value].messages.pop();

      changeTitle.value.index = indexnumber.value;
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
      messages.value[indexnumber.value].messages.push({
        type: "assistant",
        content: firstchat.content.assistant,
      });
    } else {
      //多次发送时
      const sendmessage: sendMessage = {
        apiKey: apikey.value,
        chatId: messages.value[indexnumber.value].chatId,
        content: {
          user: textarea.value,
        },
      };
      textarea.value = "";
      const getchat: getMessage = await getmessage(sendmessage);

      messages.value[indexnumber.value].messages.pop();
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
      messages.value[indexnumber.value].messages.push({
        type: "assistant",
        content: getchat.content.assistant,
      });
    }

    isLoading.value = false;
  
  } else {
    //缺乏apikey的dialog
    ElMessage({
      message: "ApiKey没有输入或未选择AI模型",
      type: "error",
    });
  }
}

watch(
  () => route.params.id,
  (newid) => {
    const contentid = newid;
    firstclick.value = false;
   
    queryId.value = newid as string;
    if (contentid == "0") {
      indexnumber.value = -1;
      return;
    } else if (contentid == "1") {
      if (messages.value[indexnumber.value].messages.length > 0) {
       
        db.open();
        db.messages
          .where("chatId")
          .equals(messages.value[indexnumber.value].chatId)
          .delete();
        db.messagetitles
          .where("chatId")
          .equals(messages.value[indexnumber.value].chatId)
          .delete();
        db.close();
       
     }
      const deletechat: deleteChat = {
        apiKey: apikey.value,
        chatId: messages.value[indexnumber.value].chatId,
      };

      deletemessage(deletechat);
 
      messages.value.splice(indexnumber.value, 1);
      indexnumber.value--;
      return;
    } else {
   
      for (let i = 0; i < messages.value.length; i++) {
        if (messages.value[i].chatId == contentid) {
          indexnumber.value = i;
          displayedMessages.value = currentMessages.value;
    
          return;
        }
      }
      const newmessage = {
        chatId: route.params.id as string,
        messages: [],
      };
      messages.value.push(newmessage);
      indexnumber.value = messages.value.length - 1;
      displayedMessages.value = currentMessages.value;
  
    }
  }
);

const currentMessages = computed(() => {

  return messages.value[indexnumber.value]?.messages || [];
});
const displayedMessages = ref(currentMessages.value);
// 在组件挂载时从 localStorage 中恢复值
onMounted(() => {
  const savedInput = localStorage.getItem("input");
  if (savedInput) {
    textarea.value = savedInput;
  }
});

// 监听用户输入并更新 localStorage 中的值
textarea.value = localStorage.getItem("input") || "";
watch(
  () => textarea.value,
  (newVal) => {
    localStorage.setItem("input", newVal);
  }
);

function getCharacterinfo(msg: Personality) {
  characterid.value = msg.id;

  Character.value = msg;
  isShowCharacter.value = true;
}

onMounted(async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();

    if (firtRecord) {
      apikey.value = firtRecord.apikey as string;
      model.value = firtRecord.model as string;
    }
    if (!db.isOpen()) db.open();
    if ((await db.messagetitles.toArray()).length != 0) {
      const allMessageTitles = await db.messagetitles.toArray();

      const chatIds = allMessageTitles.map(
        (messageTitle) => messageTitle.chatId
      );

      for (const chatid of chatIds) {
        const messagesForChat = await db.messages
          .where("chatId")
          .equals(chatid)
          .toArray();
        const messages1: Chat = {
          chatId: chatid,
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
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
