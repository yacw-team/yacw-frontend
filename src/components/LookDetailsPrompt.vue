<template>
  <el-card :body-style="{ padding: '20px' }" shadow="always" justify-content="space-between">
    <div class="background" :style="{ background: myData.background }">
      <span class="emoji">{{ myData.icon }}</span>
      <span class="name">{{ myData.name }}</span>
    </div>
    <div class="bottom" style="padding: 14px">

      <div class="item">
        <h4>Name:</h4>
        <p>{{ myData.description }}</p>
      </div>
      <div class="item">
        <h4>Description:</h4>
        <p>{{ myData.description }}</p>
      </div>
      <div class="item">
        <h4>Prompts:</h4>
        <p>{{ myData.prompts }}</p>
      </div>

    </div>
    <div class="footer">
      <el-button @click="handleClick">Use it!</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { emitChangeFn } from 'element-plus';
import { defineProps, reactive } from 'vue';
import { useRouter } from 'vue-router';


interface Jsondata {
  
  name: string;
  description: string;
  prompts: string;
 
  background: string;
  icon: string;
}

const props = defineProps({
  jsondataicon:String, 
  jsondataname:String, 
  jsondatadescription:String, 
  jsondatabackground:String, 
  jsondataprompts:String, 
});
const myData = reactive<Jsondata>({
    
    name: props.jsondataname as string,
    description:props.jsondatadescription as string, 
    prompts: props.jsondataprompts as string,
    background: props.jsondatabackground as string,
    icon: props.jsondataicon as string,
});


const emit = defineEmits(['usePrompt']);
const myData = reactive<Jsondata>(props.jsonData);


//原本的实现方式-----使用router.push传递参数

// const router = useRouter();

// function handleClick() {
//   const data = JSON.stringify(myData.prompts);
//   //const encodedData = encodeURIComponent(data);
//   router.push({ name: 'chatInput1', query: { data:data } });
//   // const data = JSON.stringify(myData.prompts);
//   // router.push({ name: 'test3', query: { data:data } });

//   console.log(data)
// }

function handleClick(){
  emit('usePrompt',myData.prompts);
}

</script>

<style scoped>
.el-card .background {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 100%;
}

.el-card .emoji {
  font-size: 48px;
}

.el-card {
  max-width: 60%;
  min-width: 40%;
  margin-top: 10%;
  margin-left: 20%;

  border: solid #000000;
  border-radius: 20px;
}





h4 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 5px;


}

p {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0;
  margin-top: 0;

  flex-direction: column;
  align-items: flex-start;

  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.item {
  font-size: large;
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
  /* 分隔每个item */
}

.footer {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: flex-end;
  /* 垂直居底 */

  position: relative;
  /* 设置容器为相对定位 */
}

.el-button {
  position: absolute;
  /* 设置按钮为绝对定位，相对于容器进行定位 */
  bottom: 0;
  /* 距离容器底部为0 */
}
</style>
