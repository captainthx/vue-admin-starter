import {
  type LoginRequest,
  type RefreshTokenRequest,
  type TokenResponse
} from './../service/index.d'
import { defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
import { Longin, Refresh } from '@/service/authApi'
import type { AxiosResponse } from 'axios'

/**
 * ใช้สำหรับสร้าง store ของ authentication
 * @returns {Object} คืนค่า method สำหรับการจัดการ token
 */
/**
 * สร้าง store สำหรับจัดการข้อมูล authentication
 * @returns {Object} คืนค่า object ที่ประกอบไปด้วย function ต่างๆ เช่น getToken, setToken, loadAuth, refreshAuth, tokenExpire, refreshtokenExpire, และ hasToken
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<TokenResponse>()

  const getToken = () => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      return (token.value = JSON.parse(localToken) as TokenResponse)
    }
  }

  /**
   * ตรวจสอบว่ามี token หรือไม่
   * @returns {boolean} ค่าเป็น true ถ้ามี token และ false ถ้าไม่มี
   */
  const hasToken = computed(() => {
    return token.value !== null
  })

  /**
   * ตรวจสอบว่า token หมดอายุหรือไม่
   * @returns {boolean} ค่าเป็น true ถ้า token หมดอายุแล้ว และเป็น false ถ้า token ยังไม่หมดอายุ
   */
  const tokenExpire = (): boolean => {
    if (hasToken.value && token.value) {
      const expire = new Date(token.value.accessTokenExpire)
      const now = new Date()
      return now.getTime() + 60 * 1000 < expire.getTime()
    }
    return false
  }

  const setToken = (res: TokenResponse) => {
    localStorage.setItem('token', JSON.stringify(res))
    token.value = res
  }

  // transfer token from api & refresh  token
  const transfer = (response: AxiosResponse<TokenResponse>) => {
    if (response.status === 200) {
      setToken(response.data)
    }
    if (response.status === 401) {
      console.log('error', response.data)
    }
  }

  const loadAuth = async (data: LoginRequest) => {
    try {
      const res = await Longin(data)
      if (res.status === 200) {
        setToken(res.data)
      }
      if (res.status === 401) {
        console.log('error', res.data)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const refreshAuth = async (refreshToken: RefreshTokenRequest) => {
    const res = await Refresh(refreshToken)
    transfer(res)
  }

  watchEffect(() => {
    getToken()
  })

  return { token, getToken, setToken, loadAuth, refreshAuth, tokenExpire, hasToken }
})
