<script setup>
import { ref, onMounted, computed } from 'vue'
import { purchaseOrderService, commonServices } from '../services'
import ItemModal from './ItemModal.vue'
import { useRoute } from 'vue-router'
import { useFetch } from '../helpers';

const route = useRoute()

const poDetail = ref({
  code: '',
  createdBy: {
    name: ''
  },
  summary: '',
  currency: {
    code: ''
  },
  items: []
})
const currencies = ref([])
const isShowModal = ref(false)
const subjects = ref([])
const itemEdit = ref(null)
const page = ref(1)
const itemPerPage = 2
const rules = (fieldName) => [value => value ? true : `You must enter ${fieldName}`]
const { loading, data: dataPO, execute } = useFetch(() => {
  if (route.params.id)
    purchaseOrderService.getPurchaseOrderById(route.params.id)
})

onMounted(async () => {

  await execute()
  poDetail.value = dataPO.value

  commonServices.getCurrencyByParams().then((data) => {
    currencies.value = data.items
  })

  commonServices.getSubjectByParams().then((data) => {
    subjects.value = data.items
  })
})

const toggleModal = () => {
  isShowModal.value = !isShowModal.value
}

const handleShowAdd = () => {
  isShowModal.value = true
  itemEdit.value = null
}

const modifyItem = (item, index) => {
  if (index !== null) {
    poDetail.value.items.splice(index, 1, item)
  } else {
    poDetail.value.items.push(item)
  }
}

const handleShowEdit = index => {
  itemEdit.value = { item: poDetail.value.items[index], index }
  isShowModal.value = true
}

const getSubjectName = (id) => {
  return subjects.value.find((item) => item.id === id)?.name
}

const isEditing = computed(() => !!route.params.id)

const totalPages = computed(() => Math.floor(poDetail.value.items.length / itemPerPage))

const slicedItems = computed(() => {
  return poDetail.value.items.slice((page.value - 1) * itemPerPage, (page.value - 1) * itemPerPage + itemPerPage)
})
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
        <tr v-for="(item, index) in slicedItems" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ getSubjectName(item.subjectId) ?? item.subject.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unitCost }}</td>
          <td><v-btn size="small" color="primary" @click="handleShowEdit(index)" icon="mdi-pencil"></v-btn></td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="page" :length="totalPages"></v-pagination>
    <v-dialog v-model="isShowModal" width="1000">
      <ItemModal @close="toggleModal" @modify-item="modifyItem" :subjects="subjects" :item-edit="itemEdit" />
    </v-dialog>
  </v-container>
</template>

