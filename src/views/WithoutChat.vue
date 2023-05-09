<template>
  <div class="container">
    <div class="column">
      <div class="title"><User /><h2 style="padding-top:10px;">输入样例</h2></div>
      <div class="card-col">
        <el-card>
          <p>我想了解一下新冠疫苗的情况，你能告诉我吗？</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p>请给我推荐一本好看的小说。</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p>我在寻找一家意大利餐厅，请问你有推荐吗？</p>
        </el-card><div class="card-separate"></div>
      </div>
    </div>
    <div class="column">
      <div class="title"><Setting /><h2 style="padding-top:10px;">功能</h2></div>
      <div class="card-col">
        <el-card>
          <p> 支持智能对话，可以回答用户的问题和进行聊天</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p> 可以进行文本生成，例如生成文章、段落等</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p> 能够进行语言翻译，支持多种语言之间的翻译</p>
        </el-card><div class="card-separate"></div>
      </div>
    </div>
    <div class="column">
      <div class="title"><Warning /><h2 style="padding-top:10px;">局限性</h2></div>
      <div class="card-col">
        <el-card>
          <p> 对于一些特定领域的问题，可能无法给出准确的答案</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p> 在处理连贯逻辑的场景时，可能会出现回答不一致或者矛盾的情况</p>
        </el-card><div class="card-separate"></div>
        <el-card>
          <p> 对于一些复杂的文本任务，例如长篇小说的创作等，可能需要多次迭代才能得到满意的结果</p>
        </el-card><div class="card-separate"></div>
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
        /><el-button :span="1" :disabled="!textarea" @click="sendMessage">{{ send }}</el-button>
      </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import ChatSideBar from "./components/ChatSideBar.vue";
import { ref, watch, provide,defineProps, onMounted  } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

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
        let firstchat:firstchat = response.data;
        changeTitle.value.index = indexnumber.value
        changeTitle.value.id =firstchat.chatId
        changeTitle.value.title=firstchat.content.title
      });
  } else {
    //多次发送时
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
        const assistantmessage :Message = {
          type: "assistant",
          content: getchat.content.assistant,
        };
        messages.value[indexnumber.value].messages.push(assistantmessage);
      });
  }

  //下面是模拟发送直接改index为2的chat的标题
      (isLoading.value = false);
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
    indexnumber.value = messages.value.length - 1;
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
.container {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
}

.column {
    width: 50%;
    text-align:center;
    padding-left:100px;
}
.title {

display: inline-block;
width:20%;
margin: 80px 10px;
font-size: 20px;
}
.el-card {
width:70%;
}
.card-col {
padding-left:100px;

}
.card-separate
{
height:20px;
}
.sendchat {
display: flex;
height: 20%;
}
</style>

