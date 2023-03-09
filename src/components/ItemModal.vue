<script>
import Modal from './Modal.vue'
export default {
  name: 'ItemModal',
  components: { Modal },
  props: ['itemEdit', 'subjects'],
  data() {
    return {
      item: {
        quantity: 0,
        unitCost: 0,
        subject: null
      },
      editIndex: null
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('modifyItem', this.item, this.editIndex)
      this.$emit('close')
    }
  },
  watch: {
    itemEdit: {
      immediate: true,
      handler(newItem) {
        if (!newItem) {
          this.item = {
            quantity: 0,
            unitCost: 0,
            subject: null
          }
        } else {
          this.item = { ...newItem.item }
          this.editIndex = newItem.index
        }
      }
    }
  }
}
</script>

<template>
  <Modal>
    <h3>{{ editIndex !== null ? 'Edit PO' : 'Create PO' }}</h3>
    <form @submit.prevent="handleSubmit">
      <label>
        Subject
        <select v-model="item.subject">
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select>
      </label>
      <label>Quantity<input :min="0" type="number" v-model="item.quantity" /></label>
      <label>Unit cost<input :min="0" type="number" v-model="item.unitCost" /></label>
      <button type="submit">{{ editIndex !== null ? 'Save' : 'Add' }}</button>
    </form>
  </Modal>
</template>
