import axios, { type AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json'
    // 'Authorization': `Bearer ${token.value?.accessToken}`,
  }
})

export default client
