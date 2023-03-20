<script setup>
import { ref, onMounted, watch } from 'vue'
import { PAGE_SIZE } from '../constants'
import { purchaseOrderService, commonServices } from '../services'
import { useRouter } from 'vue-router'

const router = useRouter()

const params = ref({
  page: 1,
  limit: PAGE_SIZE,
  code: null,
  poStatusId: null,
  summary: '',
  costCenterId: null
})
const purchaseOrders = ref([])
const loading = ref(false)
const timeout = ref(null)
const pageCount = ref(0)
const total = ref(0)
const statusOptions = [
  { value: '', name: 'All' },
  { value: 1, name: 'Draft' },
  { value: 2, name: 'Awaiting Review' },
  { value: 3, name: 'Completed' },
  { value: 4, name: 'Awaiting Approval' },
  { value: 5, name: 'Awaiting Payment' },
  { value: 6, name: 'Paid' }
]
const costCenters = ref([])

const getPurchaseOrder = async (params) => {
  loading.value = true
  const newParams = Object.entries(params).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})
  const data = await purchaseOrderService.getPurchaseOrderByParams(newParams)
  purchaseOrders.value = data.items
  pageCount.value = data.pageCount
  total.value = data.totalItems
  loading.value = false
}

onMounted(async () => {
  const data = await commonServices.getCostCenterByParams()
  costCenters.value = data.items
})

const goToPath = (path) => {
  router.push(path)
}

watch(
  params,
  (newParams) => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
      getPurchaseOrder(newParams)
    }, 500)
  },
  { immediate: true, deep: true }
)

watch(
  () => [
    params.value.code,
    params.value.poStatusId,
    params.value.summary,
    params.value.costCenterId
  ],
  () => {
    params.value.page = 1
  }
)
</script>
<template>
  <v-container>
    <h4 class="text-h4">Purchase order</h4>
    <div class="d-flex justify-end">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus-circle"
        @click="goToPath('/purchase-order/add')"
        >Create</v-btn
      >
    </div>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-text-field v-model="params.code" label="Code" />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="params.poStatusId"
          label="Status"
          :items="statusOptions"
          item-title="name"
          item-value="value"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="params.summary" label="Summary" />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="params.costCenterId"
          label="Cost Center"
          :items="costCenters"
          item-title="name"
          item-value="id"
        />
      </v-col>
    </v-row>
    <div class="text-subtitle-1">Total: {{ total }}</div>
    <div v-if="loading" class="w-100 d-flex justify-center">
      <v-progress-circular indeterminate color="teal"></v-progress-circular>
    </div>
    <v-table v-else>
      <thead>
        <tr>
          <th>Code</th>
          <th>Status</th>
          <th>Title</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in purchaseOrders" :key="item.id">
          <td>
            <router-link :to="`/purchase-order/${item.id}`">{{ item.code }}</router-link>
          </td>
          <td>{{ item.poStatus?.name }}</td>
          <td>{{ item.summary }}</td>
          <td>{{ Number(item.totalPayableTo).toLocaleString() }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="params.page" :length="pageCount"></v-pagination>
  </v-container>
</template>
