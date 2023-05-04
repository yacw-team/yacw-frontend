<template>
  <div>
    <SideBar />
    <el-button @click="showModal = true">AIcharacter</el-button>
    <ModalItem :show="showModal" :component-name="componentName" @close="showModal = false"></ModalItem>

  </div>
</template>

<script lang="ts">
import ModalItem from './ModalItem.vue'
 import AIcharacter from './AIcharacter.vue'

export default {
  name: "OpenInterface",
  components: {
    ModalItem,
    // AIcharacter,
  },
  data() {
    return {
      showModal: false,
      componentName: 'AIcharacter',
    }
  }
};
</script>
