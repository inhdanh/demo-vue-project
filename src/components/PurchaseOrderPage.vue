<script>
import { PAGE_SIZE } from '../constants'
import { purchaseOrderService, commonServices } from '../services'

export default {
  data() {
    return {
      params: {
        page: 1,
        limit: PAGE_SIZE,
        code: null,
        poStatusId: null,
        summary: '',
        costCenterId: null

      },
      purchaseOrders: [],
      loading: false,
      timeout: null,
      pageCount: 0,
      total: 0,
      statusOptions: [
        { value: '', name: 'All' },
        { value: 1, name: 'Draft' },
        { value: 2, name: 'Awaiting Review' },
        { value: 3, name: 'Completed' },
        { value: 4, name: 'Awaiting Approval' },
        { value: 5, name: 'Awaiting Payment' },
        { value: 6, name: 'Paid' },
      ],
      costCenters: []
    }
  },
  mounted() {
    this.getPurchaseOrder(this.params)
    commonServices.getCostCenterByParams().then(data => {
      this.costCenters = data.items
    })
  },
  watch: {
    params: {
      handler(newValues) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getPurchaseOrder(newValues)
        }, 500)
      },
      deep: true
    },
    'params.code'() {
      this.params.page = 1
    },
    'params.poStatusId'() {
      this.params.page = 1
    },
    'params.summary'() {
      this.params.page = 1
    },
    'params.costCenterId'() {
      this.params.page = 1
    }
  },
  methods: {
    async getPurchaseOrder(params) {
      this.loading = true
      const newParams = Object.entries(params).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})
      const data = await purchaseOrderService.getPurchaseOrderByParams(newParams)
      this.purchaseOrders = data.items
      this.pageCount = data.pageCount
      this.total = data.totalItems
      this.loading = false
    },
    goToPath(path) {
      this.$router.push(path)
    }
  }
}
</script>
<template>
  <v-container>
    <h4 class="text-h4">Purchase order</h4>
    <div class="d-flex justify-end">
      <v-btn variant="outlined" prepend-icon="mdi-plus-circle" @click="goToPath('/purchase-order/add')">Create</v-btn>
    </div>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-text-field v-model="params.code" label="Code" />
      </v-col>
      <v-col cols="3">
        <v-select v-model="params.poStatusId" label="Status" :items="statusOptions" item-title="name"
          item-value="value" />
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="params.summary" label="Summary" />
      </v-col>
      <v-col cols="3">
        <v-select v-model="params.costCenterId" label="Cost Center" :items="costCenters" item-title="name"
          item-value="id" />
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

<style scoped>
.active {
  font-weight: bold;
}

.pagination {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination li {
  cursor: pointer;
}
</style>
