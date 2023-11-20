import {
  type LoginRequest,
  type RefreshTokenRequest,
  type TokenResponse
} from './../service/index.d'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { Longin, Refresh } from '@/service/authApi'
import type { AxiosResponse } from 'axios'

/**
 * ใช้สำหรับสร้าง store ของ authentication
 * @returns {Object} คืนค่า method สำหรับการจัดการ token
 */
/**
 * สร้าง store สำหรับจัดการข้อมูล authentication
 * @returns {Object} คืนค่า object ที่ประกอบไปด้วย function ต่างๆ เช่น getToken, setToken, loadAuth, refreshAuth, isExpire, refreshIsExpire, และ hasToken
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<TokenResponse>()

  const getToken = () => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      return (token.value = JSON.parse(localToken) as TokenResponse)
    }
  }

  const hasToken = computed(() => {
    return token.value !== null
  })

  const isExpire = () => {
    if (token.value) {
      const tokenExpire = token.value.accessExpire
      if (tokenExpire) {
        const expire = new Date(token.value.accessExpire)
        const now = new Date()
        if (now.getTime() + 60 * 1000 > expire.getTime()) return true
      }
    }
    return false
  }

  const refreshIsExpire = () => {
    if (token.value) {
      const tokenExpire = token.value.refreshExpire
      if (tokenExpire) {
        const expire = new Date(token.value.refreshExpire)
        const now = new Date()
        if (now.getTime() + 60 * 1000 > expire.getTime()) return true
      }
    }
    return false
  }

  const setToken = (res: TokenResponse) => {
    localStorage.setItem('token', JSON.stringify(res))
    token.value = res
    console.log('token', token.value)
  }

  // transfer token from api & refresh  token
  const transfer = (response: AxiosResponse<TokenResponse>) => {
    if (response.status === 200) {
      setToken(response.data)
    }
    if (response.status === 401) {
      console.log('error', response.data)
      return response.status
    }
  }

  const loadAuth = async (data: LoginRequest) => {
    const res = await Longin(data)
    transfer(res)
    console.log('token', token.value)
  }

  const refreshAuth = async (refreshToken: RefreshTokenRequest) => {
    const res = await Refresh(refreshToken)
    transfer(res)
  }

  watchEffect(() => {
    isExpire()
    getToken()
  })

  return { token, getToken, setToken, loadAuth, refreshAuth, isExpire, refreshIsExpire, hasToken }
})
