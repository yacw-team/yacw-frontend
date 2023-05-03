<template>
  <div>
    <el-button @click="showModal = true">AIcharacter</el-button>
    <Modal :show="showModal" :component-name="componentName" @close="showModal = false"></Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import AIcharacter from './AIcharacter.vue'

export default {
  name: "Open",
  components: {
    Modal,
    AIcharacter,
  },
  data() {
    return {
      showModal: false,
      componentName: 'AIcharacter',
    }
  }
};
</script>
