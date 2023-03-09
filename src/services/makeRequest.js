import axios from 'axios'
import { USER } from '../constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export const logout = () => {
  localStorage.removeItem(USER)
  location.reload()
}

api.interceptors.request.use(
  (config) => {
    if (config.url !== '/auth/login') {
      const token = JSON.parse(localStorage.getItem(USER))?.access_token
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  ({ response }) => {
    if (response.status === 401) {
      logout()
    }
  }
)

export const makeRequest = (url, options) =>
  api(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data?.message ?? 'Error'))
