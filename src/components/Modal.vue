<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <button @click="closeModal">X</button>
      <div class="modal-body">
        <component :is="componentName"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: Boolean,
    componentName: String
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-width: 90%;
  max-height: 90%;
  width:1200px;
  height:800px;
  overflow-y: auto;
}

.modal-body {
  margin-top: 20px;
}
</style>