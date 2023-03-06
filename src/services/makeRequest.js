import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

const logout = () => {
  localStorage.removeItem('user')
}

api.interceptors.request.use(config => {
  if (config.url !== '/auth/login') {
    const token = JSON.parse(localStorage.getItem('user'))?.access_token;
    if (token)
      config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(response => {
  console.log('res', response)
  if (response.status === 401) {
    logout()
    location.reload()
    return null
  }
  return response
}, error => Promise.reject(error))

export const makeRequest = (url, options) =>
  api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
