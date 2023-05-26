<template>
  <div class="star">
    <div
      class="dot"
      v-for="item in nums"
      :key="item"
      :style=" `--delay:${Math.random()*2}s;
      --color:hsl(${Math.random()*360},50%,50%)
            `"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const nums = computed(() => {
  return Math.floor(window.innerWidth / 10);
//return 1;
});
</script>

<style scoped>
.star {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.dot {
  width: 5px;
  height: 5px;
  background-color: var(--color);
  border-radius: 50%;
  position: relative;
 animation: up 2s cubic-bezier(0,0.75,1,-0.07) infinite;
  animation-delay: var(--delay);
}
.dot::after{
    content: "";
    width: 100%;
    position: absolute;
    height: 100px;
    bottom: -95px;
    background: linear-gradient(to bottom,var(--color),rgba(0,0,0,0.1) 80%);
  }
@keyframes up {
  to {
    transform: translateY(-100vh);
  }
}

</style>


