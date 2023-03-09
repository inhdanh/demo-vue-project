<script>
import { PAGE_SIZE } from '../constants'
import { purchaseOrderService } from '../services'

export default {
  data() {
    return {
      params: {
        page: 1,
        limit: PAGE_SIZE,
        code: null,
        poStatusId: null
      },
      purchaseOrders: [],
      loading: false,
      timeout: null,
      pageCount: 0,
      total: 0
    }
  },
  mounted() {
    this.getPurchaseOrder(this.params)
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
    goToPage(page) {
      this.params.page = page
    }
  }
}
</script>
<template>
  <h1>Purchase order</h1>
  <router-link to="/purchase-order/add">Create</router-link>
  <div class="filter-wrapper">
    <label>Code<input v-model="params.code" /></label>
    <label
      >Status<select v-model="params.poStatusId">
        <option value="">All</option>
        <option :value="1">Draft</option>
        <option :value="2">Awaiting Review</option>
        <option :value="3">Completed</option>
        <option :value="4">Awaiting Approval</option>
        <option :value="5">Awaiting Payment</option>
        <option :value="6">Paid</option>
      </select></label
    >
  </div>
  <h3>Total: {{ total }}</h3>
  <div v-if="loading">Loading...</div>
  <table v-else class="po-table">
    <tr>
      <th>Code</th>
      <th>Status</th>
      <th>Title</th>
      <th>Total Amount</th>
    </tr>
    <tr v-for="item in purchaseOrders" :key="item.id">
      <td>
        <router-link :to="`/purchase-order/${item.id}`">{{ item.code }}</router-link>
      </td>
      <td>{{ item.poStatus?.name }}</td>
      <td>{{ item.summary }}</td>
      <td>{{ Number(item.totalPayableTo).toLocaleString() }}</td>
    </tr>
  </table>
  <ul class="pagination">
    <li :class="{ active: n === params.page }" v-for="n in pageCount" :key="n" @click="goToPage(n)">
      {{ n }}
    </li>
  </ul>
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

.filter-wrapper {
  margin-top: 20px;
}

.po-table {
  margin-top: 20px;
}

.po-table td {
  padding: 5px;
}
</style>
