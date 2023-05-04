<template>
  <div>
<<<<<<< HEAD
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
=======
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
>>>>>>> cf7607b8fc14186cd483b657026330bcc1261571
  },
  data() {
    return {
      showModal: false,
      componentName: 'AIcharacter',
    }
  }
};
</script>
