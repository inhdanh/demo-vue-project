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
        },
        items: []
      },
      loading: false,
      currencies: [],
      isShowModal: false,
      subjects: [],
      itemEdit: null,
      rules(fieldName) {
        return [
          value => {
            if (value) return true

            return `You must enter ${fieldName}.`
          },
        ]
      },
      itemPage: 1,
      itemsPerPage: 2
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
        this.poDetail.items.splice(index, 1, item)
      } else {
        this.poDetail.items.push(item)
      }
    },
    handleShowEdit(index) {
      this.itemEdit = { item: this.poDetail.items[index], index }
      this.isShowModal = true
    },
    getSubjectName(id) {
      return this.subjects.find((item) => item.id === id)?.name
    },
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id
    },
    totalPages() {
      return Math.floor(this.poDetail.items.length / this.itemsPerPage)
    },
    startIndex() {
      return (this.itemPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return (this.itemPage - 1) * this.itemsPerPage + this.itemsPerPage;
    }
  }
}
</script>

<template>
  <v-container>
    <div class="text-h4">{{ isEditing ? 'Purchase order detail' : 'Create purchase order' }}</div>
    <div v-if="loading" class="w-100 d-flex justify-center">
      <v-progress-circular indeterminate color="teal"></v-progress-circular>
    </div>
    <v-form class="mt-5" v-else ref="form">
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="poDetail.code" disabled label="Code"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="poDetail.createdBy.name" disabled label="Created By"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="poDetail.summary" :rules="rules('summary')" label="Summary"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select v-model="poDetail.currency.code" label="Currency" :items="currencies" item-title="name"
            item-value="code" />
        </v-col>
      </v-row>
    </v-form>

    <div class="text-subtitle-1">Items</div>
    <v-btn class="mt-2" variant="outlined" @click="handleShowAdd">Add</v-btn>

    <v-table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Subject</th>
          <th>Quantity</th>
          <th>Unit Cost</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in poDetail.items.slice(startIndex, endIndex)" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ getSubjectName(item.subjectId) ?? item.subject.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unitCost }}</td>
          <td><v-btn size="small" color="primary" @click="handleShowEdit(index)" icon="mdi-pencil"></v-btn></td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="itemPage" :length="totalPages"></v-pagination>
    <v-dialog v-model="isShowModal" width="1000">
      <ItemModal @close="toggleModal" @modify-item="modifyItem" :subjects="subjects" :item-edit="itemEdit" />
    </v-dialog>
  </v-container>
</template>

