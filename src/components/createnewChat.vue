<template>
  <div>
    
      <span @click="handlegotochat">{{ icon1 }}</span>
      <span>{{conversation.title}}</span>
      <span @click="opendialog">{{ icon2 }}</span>
      <el-dialog v-model="dialogVisible1">
        <p class="item">更改标题</p>
        <el-input v-model="input" :placeholder= "conversation.title"/>
        <template #footer>
          <el-button class="item2" @click="closedialog">确定</el-button>
        </template>
      </el-dialog>
   
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps,PropType } from "vue";
const icon1 = "📄";
const icon2 = "✍️";

const input = ref("");
function handlegotochat() {
  alert(111);
}

const dialogVisible1 = ref(false);

function opendialog() {

  dialogVisible1.value = true;
}


function closedialog() {
  if(conversation.title!= input.value)
  {
    conversation.updateItems(conversation.index,input.value)  
  }
  dialogVisible1.value = false;
}

const conversation = defineProps({
  title:String,
  chatID: String,
  index:Number,

  updateItems: {
    type: Function as PropType<(index:any, newTitle: string) => void>,
    required: true,
  },

});


</script>

<style scoped>
span {
  padding: 2%;
}
span:hover {
  background-color: yellow;
}
.item {
  font-size: large;
  display: flex;
  justify-content: center;
}
.item2 {
  margin-right: 10px;
}
</style>