<template>
  <div>
    <div>
      <div class="pt-16 text-center">
        <span class="text-4xl font-bold" ref="typing"></span>
        <div class="flex flex-row items-center justify-center p-16">
          <el-button class="mx-2" type="warning" :plain="isAPIKeyInputed" round @click="addKeyDialogVisiable = true">
            {{ APIKeyInputBtnText }}
          </el-button>
          <el-button class="mx-2" type="primary" round :plain="isModelSelected" @click="selectModelDialogVisiable = true">
            {{ modelSelectBtnText }} </el-button>
        </div>
      </div>
      <el-main>
        <div class="flex flex-row flex-wrap items-center justify-center mx-2 h-max">
          <el-card class="w-1/3 mx-4 md:w-1/5 md:mx-10 md:p-4">
            <template #header>
              <div class="flex flex-row justify-center">
                <el-icon size="20" class="mx-1">
                  <Coin />
                </el-icon>
                <span class="mx-1 text-xl font-semibold">免费开源</span>
              </div>
            </template>
            <div>
              <p>
                YACW
                是一款完全免费的开源聊天机器人项目，旨在帮助开发人员快速构建功能强大的聊天应用程序。
              </p>
            </div>
          </el-card>

          <el-card class="w-1/3 mx-4 md:w-1/5 md:mx-10 md:p-4">
            <template #header>
              <div class="flex flex-row justify-center">
                <el-icon size="20" class="mx-1">
                  <User />
                </el-icon>
                <span class="mx-1 text-xl font-semibold">注重隐私</span>
              </div>
            </template>
            <div>
              <p>
                我们非常注重用户隐私和数据保护，我们不会收集任何敏感信息，并采取了多种措施确保所有数据的安全性。
              </p>
            </div>
          </el-card>

          <el-card class="w-1/3 mx-4 my-10 md:w-1/5 md:mx-10 md:my-0 md:p-4">
            <template #header>
              <div class="flex flex-row justify-center">
                <el-icon size="20" class="mx-1">
                  <MagicStick />
                </el-icon>
                <span class="mx-1 text-xl font-semibold">体验良好</span>
              </div>
            </template>
            <div>
              <p>
                YACW
                基于最先进的自然语言处理技术，能够以流畅、自然的方式与用户交互，提供令人满意的使用体验。
              </p>
            </div>
          </el-card>
        </div>
      </el-main>
    </div>
    <el-dialog v-model="addKeyDialogVisiable" :show-close="false" width="40%" title="🔑 输入你的 OpenAI API Key" center>
      <div class="px-4">
        <div id="add-key-hint">
          <div>
            您需要在
            <a class="text-blue-500" href="https://platform.openai.com/account/api-keys">OpenAI Key Management</a>
            页面获取 OpenAI API Key.
          </div>
          <div class="my-1">
            您的 Key 将会被保存在本地浏览器中，我们不会收集您的 Key.
          </div>
        </div>
        <div id="add-key-input" class="my-6">
          <el-input v-model="openAIkey" placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <Transition>
            <div class="mt-4 text-red-500" v-if="addKeyInputError">
              您输入的 Key 格式有误。OpenAI API Key 应为 "sk-" 打头，长度为 51
              一个字符的串。
            </div>
          </Transition>
        </div>
        <div id="add-key-btns" class="flex flex-row justify-center">
          <el-button class="mr-2" @click="
            addKeyDialogVisiable = false;
          openAIkey = '';
          addKeyInputError = false;">取消</el-button>
          <el-button class="ml-2" type="primary" @click="handleAddKeySubmit"
            :loading="inputKeyWindowLoading">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="selectModelDialogVisiable" :show-close="false" width="40%" title="🤖 选择您想使用的模型" center>
      <div class="px-4">
        <div>
          <div class="flex flex-row items-center justify-center">
            <ModelSelectCard v-for="model in models"
              @submit-model="(modelValue: string) => handleSelectModelSubmit(modelValue)" v-bind:key="model.id"
              class="w-1/2 m-2" :model-image="model.modelImage" :model-name="model.modelName"
              :model-value="model.modelValue" :model-description="model.modelDescription"
              :is-selected="model.isSelected" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { Coin, User, MagicStick } from "@element-plus/icons-vue";
import ModelSelectCard from "@/views/HomePage/components/ModelSelectCard.vue";
import { db } from "../../database/db";
import Typed from "typed.js";
import { ElMessage } from "element-plus";
import { modelIdToName } from "@/utils/modelIdToName";
import { checkAPIKey } from "@/api/home/home";

const addKeyDialogVisiable = ref(false);
const selectModelDialogVisiable = ref(false);
const addKeyInputError = ref(false);

const openAIkey = ref("");
const selectedModel = ref("");

const typing = ref(null);

// 按钮样式控制
const isAPIKeyInputed = ref(false);
const APIKeyInputBtnText = ref("输入 API Key");
const isModelSelected = ref(false);
const modelSelectBtnText = ref("选择模型");

// 控制弹窗样式
const inputKeyWindowLoading = ref(false);

onBeforeMount(() => {
  checkAPIKeyExistance();
  checkSelectedModelExistance();
})

onMounted(() => {
  new Typed(typing.value, {
    strings: ["YACW", "Yet Another ChatGPT WebAPP"],
    typeSpeed: 60,
    backSpeed: 40,
    startDelay: 500,
    backDelay: 1500,
    loop: true,
  });
});

const models = [
  {
    id: "0",
    modelImage: "/gpt3.5.svg",
    modelName: "GPT-3.5",
    modelValue: "0",
    modelDescription: "快速，准确度令人满意",
    isSelected: false,
  },
  {
    id: "1",
    modelImage: "/gpt4.svg",
    modelName: "GPT-4",
    modelValue: "1",
    modelDescription: "超乎想象的准确，但缓慢",
    isSelected: false,
  },
];

const handleAddKeySubmit = async () => {
  // check key format
  if (openAIkey.value.slice(0, 3) != "sk-" || openAIkey.value.length !== 51) {
    addKeyInputError.value = true;
    return;
  }
  inputKeyWindowLoading.value = true;
  const checkStatus = await checkAPIKey(openAIkey.value);
  if (checkStatus == "") {
    ElMessage({
      message: "API Key 验证失败，请稍后重试。",
      type: "error",
    });
  }
  if (checkStatus === "200") {
    // 处理认证通过的逻辑
    try {
      await db.open();
      const firstRecord = await db.Apikey.toCollection().first();
      if (firstRecord) {
        await db.Apikey.update(firstRecord.id as number, {
          apikey: openAIkey.value,
        });
      } else {
        await db.Apikey.add({
          apikey: openAIkey.value,
          model: "",
        });
      }
      addKeyDialogVisiable.value = false;
      changeInputAPIKeyBtnStyle();
    } finally {
      db.close();
    }
    return;
  } else if (checkStatus === "401") {
    // 处理认证失败的逻辑
    ElMessage({
      message: "API Key 验证失败，请检查您的 API Key 是否正确。",
      type: "error",
    });
  }
  inputKeyWindowLoading.value = false;
};

const handleSelectModelSubmit = async (modelValue: string) => {
  selectedModel.value = modelValue;
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();
    if (firtRecord) {
      await db.Apikey.update(firtRecord.id as number, { model: modelValue });
    } else {
      await db.Apikey.add({
        apikey: "",
        model: modelValue,
      });
      console.log(firtRecord);
    }
  } finally {
    db.close();
  }

  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();
    if (firtRecord) {
      isModelSelected.value = true;
      modelSelectBtnText.value = "当前模型: " + modelIdToName(firtRecord.model);
      for (let i = 0; i < models.length; i++) {
        if (models[i].modelValue === firtRecord.model) {
          models[i].isSelected = true;
        } else {
          models[i].isSelected = false;
        }
      }
    }
  } finally {
    db.close();
  }


  selectModelDialogVisiable.value = false;
};

const checkAPIKeyExistance = async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();
    if (firtRecord) {
      changeInputAPIKeyBtnStyle();
    }
  } finally {
    db.close();
  }
};

const changeInputAPIKeyBtnStyle = async () => {
  isAPIKeyInputed.value = true;
  APIKeyInputBtnText.value = "更改 API Key";
  try {
    db.open();
    const firtRecord = await db.Apikey.toCollection().first();
    if (firtRecord) {
      openAIkey.value = maskAPIKey(firtRecord.apikey);
    }
  } finally {
    db.close();
  }
};

const maskAPIKey = (apiKey: string) => {
  return apiKey.slice(0, 3) + "********************************************" + apiKey.slice(-4);
};

const checkSelectedModelExistance = async () => {
  try {
    await db.open();
    const firtRecord = await db.Apikey.toCollection().first();
    if (firtRecord) {
      if (firtRecord.model) {
        isModelSelected.value = true;
        modelSelectBtnText.value = "当前模型: " + modelIdToName(firtRecord.model);
        for (let i = 0; i < models.length; i++) {
          if (models[i].modelValue === firtRecord.model) {
            models[i].isSelected = true;
          } else {
            models[i].isSelected = false;
          }
        }
      }
    }
  } finally {
    db.close();
  }
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.typed-cursor {
  font-size: 40px;
}
</style>
