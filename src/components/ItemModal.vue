<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['itemEdit', 'subjects'])
const item = ref({
  quantity: 0,
  unitCost: 0,
  subject: 0
})
const editIndex = ref(null)
const rules = (fieldName) => [(value) => (value ? true : `You must enter ${fieldName}.`)]
const form = ref(null)
const emit = defineEmits(['modifyItem', 'close'])

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    emit('modifyItem', item.value, editIndex.value)
    emit('close')
  }
}

watch(
  ref(props.itemEdit),
  (newItem) => {
    if (!newItem) {
      item.value = {
        quantity: 0,
        unitCost: 0,
        subject: null
      }
      editIndex.value = null
    } else {
      item.value = { ...newItem.item }
      editIndex.value = newItem.index
    }
  },
  { immediate: true }
)
</script>

<template>
  <v-card>
    <v-container>
      <div class="text-h6">
        {{ editIndex !== null ? 'Edit PO' : 'Create PO' }}
      </div>
      <v-divider></v-divider>
      <v-form @submit.prevent="handleSubmit" ref="form" class="mt-5">
        <v-row>
          <v-col cols="2">
            <v-text-field
              type="number"
              :min="0"
              v-model="item.quantity"
              label="Quantity"
              :rules="rules('quantity')"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              type="number"
              :min="0"
              v-model="item.unitCost"
              label="Unit cost"
              :rules="rules('unit cost')"
            />
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="item.subjectId"
              label="Subject"
              :items="props.subjects"
              item-title="name"
              item-value="id"
              :rules="rules('subject')"
            />
          </v-col>
        </v-row>
        <v-btn type="submit">{{ editIndex !== null ? 'Save' : 'Add' }}</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
