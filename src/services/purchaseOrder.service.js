import { makeRequest } from '.'
import { PAGE_SIZE } from '../constants'

export const purchaseOrderService = {
  getPurchaseOrderByParams,
  getPurchaseOrderById
}

function getPurchaseOrderByParams(params = { page: 1, limit: PAGE_SIZE }) {
  return makeRequest('/purchase-order', {
    params: params
  })
}

function getPurchaseOrderById(id) {
  return makeRequest(`/purchase-order/${id}`)
}
