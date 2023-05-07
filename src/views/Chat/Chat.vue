<template>
  <div class="flex">
    <SideBar2 class="sidebar" />

    <div class="content">
      <div class="chat">
        <div v-infinite-scroll="load" class="messagecontent">
          <div v-for="(message1,index) in messages" :key="index">
            <el-text
              :class="differentUser(message1.type)"
              :style="{ 'max-width': '300px' }"
            >{{ message1.content }}</el-text>
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
        <el-button :span="1" :disabled="!textarea" @click="sendmessage">{{ send }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar2 from "../../components/SideBar2.vue";
import { ref } from "vue";
import axios from "axios";
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







async function sendmessage() {
  type usermessage = message;
  const usermessage = {
    type: "user",
    content: textarea.value,
  };
  messages.value.push(usermessage);

  textarea = ref("");

  isLoading.value=true;

  axios
    .post("/v1/chat/chat", {
      apiKey: "string",
      chatId: "111",
      content: {
        user: textarea.value,
      },
    })
    .then((response) => {
      let getchat = response.data;
      type assistantmessage = message;
      const assistantmessage = {
        type: "assistant",
        content: getchat.content.assistant,
      };
      messages.value.push(assistantmessage)
     
    });
    
    isLoading.value=false;
    
    
}

function differentUser(i: string) {
  if (i == "user") {
    return "user";
  } else {
    return "assistant";
  }
}

const count = ref(0);
const load = () => {
  if (count.value < messages.value.length) {
    count.value += 1;
  }
};

interface message {
  type: string;
  content: string;
}

const messages = ref<message[]>([
  {
    type: "user",
    content: "你asssssssssssscassssssssssssssssssssha1",
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