<script>
import { purchaseOrderService, commonServices } from '../services'
import ItemModal from './ItemModal.vue'

export default {
  data() {
    return {
      poDetail: {
        code: '',
        createdBy: {
          name: ''
        },
        summary: '',
        currency: {
          code: ''
        }
      },
      loading: false,
      currencies: [],
      isShowModal: false,
      items: [],
      subjects: [],
      itemEdit: null
    }
  },
  mounted() {
    const id = this.$route.params.id

    if (id) {
      this.loading = true
      purchaseOrderService.getPurchaseOrderById(id).then((data) => {
        this.poDetail = data
        this.loading = false
      })
    }

    commonServices.getCurrencyByParams().then((data) => {
      this.currencies = data.items
    })

    commonServices.getSubjectByParams().then((data) => {
      this.subjects = data.items
    })
  },
  components: { ItemModal },
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal
    },
    handleShowAdd() {
      this.isShowModal = true
      this.itemEdit = null
    },
    modifyItem(item, index) {
      if (index !== null) {
        this.items.splice(index, 1, item)
      } else {
        this.items.push(item)
      }
    },
    getSubjectName(id) {
      return this.subjects.find((item) => item.id === id)?.name
    },
    handleShowEdit(index) {
      this.itemEdit = { item: this.items[index], index }
      this.isShowModal = true
    }
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id
    }
  }
}
</script>

<template>
  <h1>{{ isEditing ? 'Purchase order detail' : 'Create purchase order' }}</h1>
  <div v-if="loading">Loading...</div>
  <div v-else class="po-detail-wrapper">
    <label>Code<input v-model="poDetail.code" /></label>
    <label>Created by<input v-model="poDetail.createdBy.name" /></label>
    <label>Summary<input v-model="poDetail.summary" /></label>
    <label
      >Currency<select v-model="poDetail.currency.code">
        <option v-for="currency in currencies" :key="currency.id" :value="currency.code">
          {{ `${currency.code} - ${currency.name}` }}
        </option>
      </select></label
    >
    <button @click="handleShowAdd">Add</button>
  </div>
  <table>
    <tr>
      <th>Order</th>
      <th>Subject</th>
      <th>Quantity</th>
      <th>Unit Cost</th>
      <th>Action</th>
    </tr>
    <tr v-for="(item, index) in items" :key="item.id">
      <td>{{ index + 1 }}</td>
      <td>{{ getSubjectName(item.subject) }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ item.unitCost }}</td>
      <td><button @click="handleShowEdit(index)">Edit</button></td>
    </tr>
  </table>
  <div v-if="isShowModal">
    <ItemModal
      @close="toggleModal"
      @modify-item="modifyItem"
      :subjects="subjects"
      :item-edit="itemEdit"
    />
  </div>
</template>

<style scoped>
.po-detail-wrapper {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
