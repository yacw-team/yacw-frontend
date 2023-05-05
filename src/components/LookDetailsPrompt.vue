<template>
  <e-dialog>
    <el-card class="item">
      <el-card :body-style="{ padding: '20px' }">
        <div class="background" :style="{ background: Jsondata.background }">
          <span class="emoji">{{ Jsondata.emoji }}</span>
        </div>
      </el-card>

      <el-card :body-style="{ padding: '10px' }">
        <span class="item2">
          <strong>name: &nbsp;</strong>
          {{ Jsondata.name }}
          <br />
        </span>
        <span class="item2">
          <strong>description: &nbsp;</strong>
          {{ Jsondata.description }}
          <br />
        </span>
        <span class="item2">
          <strong>detail: &nbsp;</strong>
          {{ Jsondata.details }}
          <br />
        </span>
      </el-card>
    </el-card>
  </e-dialog>
</template>


<script  lang="ts">
interface Jsondata {
  id: string;
  name: string;
  description: string;
  details: string;
  type: string;
  background: string;
  emoji: string;
}
export default {
  props: {
    Jsondata: {
      type: Object as () => Jsondata,
      required: true,
    },
  },
}
</script>


<style scoped>
.item {
  max-width: 80%;
  margin-bottom: 5%;
  max-height: 90%;
  margin-top: 5%;
  margin-left: 10%;
  border: solid #000000;
  border-radius: 20px;
}
.item2 {
  font-size: large;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.item3 {
  padding: 0 30%;
  display: flex;
  justify-content: center;
}
.link-top {
  height: 1px;
  border-top: solid #2872cc 1px;
}
.text-container {
  width: 300px;
  height: 200px;
  padding: 20px;
}

.text-container span {
  display: inline;
}
</style>