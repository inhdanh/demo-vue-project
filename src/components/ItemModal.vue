<script>
export default {
  name: 'ItemModal',
  props: ['itemEdit', 'subjects'],
  data() {
    return {
      item: {
        quantity: 0,
        unitCost: 0,
        subject: null
      },
      editIndex: null,
      rules(fieldName) {
        return [
          value => {
            if (value) return true

            return `You must enter ${fieldName}.`
          },
        ]
      }
    }
  },
  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.$emit('modifyItem', this.item, this.editIndex)
        this.$emit('close')
      }
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
  <v-card>
    <v-container>
      <div class="text-h6">{{ editIndex !== null ? 'Edit PO' : 'Create PO' }}</div>
      <v-divider></v-divider>
      <v-form @submit.prevent="handleSubmit" ref="form" class="mt-5">
        <v-row>
          <v-col cols="2">
            <v-text-field type="number" :min="0" v-model="item.quantity" label="Quantity" :rules="rules('quantity')" />
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" :min="0" v-model="item.unitCost" label="Unit cost" :rules="rules('unit cost')" />
          </v-col>
          <v-col cols="4">
            <v-select v-model="item.subjectId" label="Subject" :items="subjects" item-title="name" item-value="id"
              :rules="rules('subject')" />
          </v-col>
        </v-row>
        <v-btn type="submit">{{ editIndex !== null ? 'Save' : 'Add' }}</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
