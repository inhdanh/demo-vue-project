import { makeRequest } from '.'

export const commonServices = {
  getCurrencyByParams,
  getSubjectByParams
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
