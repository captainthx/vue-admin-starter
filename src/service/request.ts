import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import axios, { type AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.request.use(async (config) => {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  config.headers.Authorization = `Bearer ${token.value?.accessToken}`
  return config
})

export default client
