import { makeRequest } from '.'

export const commonServices = {
  getCurrencyByParams,
  getSubjectByParams,
  getCostCenterByParams
}

function getCurrencyByParams(params = {}) {
  return makeRequest('/setting/payment/currency', {
    params: params
  })
}

function getSubjectByParams(params = {}) {
  return makeRequest('/setting/school/subject', {
    params: params
  })
}

function getCostCenterByParams(params = {}) {
  return makeRequest('/setting/school/cost-center', {
    params: params
  })
}