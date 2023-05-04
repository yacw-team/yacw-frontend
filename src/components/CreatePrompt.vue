<template>
    <el-button text @click="open"  round plain style=" background-color: rgb(187, 144, 92);" >
      Create Prompt
</el-button>
  
    <el-dialog id="Mydialog" v-model="dialogFormVisible" title="New Prompt"  >
      <el-form :model="form" label-position="left" size="large">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        
        <el-form-item label="Prompts" :label-width="formLabelWidth">
          <el-input v-model="form.prompts" type="textarea" autocomplete="off" />
        </el-form-item>

        
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitForm1" round>
           Add Prompt
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import axios from 'axios';
  
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'

  function open(){
    dialogFormVisible.value=true;
  }

  const form = reactive({
    apiKey:'',
    name: '',
    description: '',
    details:'',
    exampleInput: '',
    exampleOutput: '',
    prompts: '',
    content:'',
  })

  async function submitForm1() {
    dialogFormVisible.value=false;
  try {
    await axios.post('/v1/chat/prompts', {
      name: form.name,
      description: form.description,
      prompts:form.prompts,
      details:form.details,
      exampleInput: form.exampleInput,
      exampleOutput: form.exampleOutput,
      content:form.content,
    });
   
  } catch (error) {
    console.error(error);
    
  }
}


  </script>

  <style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button {
    margin-left: 10px;
    background-color: rgb(230, 220, 233);
   
  }
  .el-dialog {
    background-color: rgb(177, 167, 155);
  }
  </style>
  