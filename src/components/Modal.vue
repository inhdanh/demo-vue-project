<script>
export default {
  name: 'CustomModal',
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
<template>
  <div class="blackdrop" @click.self="closeModal">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.blackdrop {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 10px;
  background-color: white;
  min-width: 500px;
  min-height: 200px;
}
</style>
