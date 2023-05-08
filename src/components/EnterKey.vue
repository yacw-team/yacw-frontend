<template>
  <el-button text @click="open" round style="background-color: bisque;" :disabled="isLoading">{{ buttonText }}</el-button>
  <el-dialog v-model="dialogVisible" title="Enter License Key" v-model:visible="dialogVisible">
    <el-form :model="form" >
      <el-form-item prop="key">
        <el-input v-model="computedValue" placeholder="Please enter your license key" @input="inputHandler"></el-input>
      </el-form-item>
    </el-form>
    <div> 
      <el-select style="width: 100%; padding-top: 30px; padding-bottom: 30px" v-model="selectedModel" placeholder="Select ChatGPT model">
        <el-option label="GPT-3.5-TURBO(Default ChatGPT)" value="gpt3.5" />
        <el-option label="GPT-4(Limited Beta)" value="gpt4.0" />
      </el-select>
    </div>
    <div >
      <el-button @click="close">Cancel</el-button>
      <el-button style="width:10%;"  @click="submit" :loading="isLoading">ok</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from '../components/store'//引入全局变量apiKey
const store = useStore()
const apiKey = computed(() => store.state.apiKey) // 计算属性获取apiKey
const router = useRouter();
const dialogVisible = ref(false);
const form = ref({
  key: '',
});
const isLoading = ref(false);
const buttonText = ref('Enter License Key');
const selectedModel = ref('');
const open = () => {
  if (apiKey.value) {
    router.push('/v1/chat');
    console.log(apiKey.value)
  } else {
    dialogVisible.value = true;
  }
};

const close = () => {
  dialogVisible.value = false;
  form.value.key = '';
  computedValue.value = '';
};

const submit = async () => {
  if(!selectedModel.value)
  {
    ElMessage(
      {
        type:'error',
        message:'Please select a ChatGPT model',
      }
    )
  }else if (form.value.key === '') {
    ElMessage({
      type: 'error',
      message: 'Please input your key',
    });
  } else if (form.value.key.substring(0, 2) !== 'sk') {
    ElMessage({
      type: 'error',
      message: 'Invalid Input! ApiKey should start with "sk".',
    });
  } else {
    isLoading.value = true;
    buttonText.value = 'Loading...';

    try {
      const response = await axios.post(`/v1/chat/apikey`, { key: form.value.key });

      if (response.status === 200) {
        store.setApiKey(form.value.key); // 在Vuex store中存储apiKey
        router.push(`/v1/chat/`);
        dialogVisible.value = false;
        ElMessage({
          type: 'success',
          message: 'API key has been submitted successfully',
        });
      } else {
        ElMessage({
          type: 'error',
          message: 'Unauthorized: Invalid Key',
        });
      }
    } catch (error:any) {
      ElMessage({
        type: 'error',
        message: `Failed to submit: ${err.message}`,
      });
    } finally {
      isLoading.value = false;
      buttonText.value = 'Enter License Key';
    }
  }
};

const computedValue = computed<string>({
  get() {
    return form.value.key;
  },
  set(value:string) {
    form.value.key = value;
  },
}) as { value: string };

// 只允许输入字母和数字
const inputHandler = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  computedValue.value = input.value;
};
</script>
