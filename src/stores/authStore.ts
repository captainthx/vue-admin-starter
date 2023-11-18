import {
  type ApiResponse,
  type LoginRequest,
  type RefreshTokenRequest,
  type TokenResponse
} from './../service/index.d'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { Longin, Refresh } from '@/service/authApi'

/**
 * ใช้สำหรับสร้าง store ของ authentication
 * @returns {Object} คืนค่า method สำหรับการจัดการ token
 */
/**
 * สร้าง store สำหรับจัดการข้อมูล authentication
 * @returns {Object} คืนค่า object ที่ประกอบไปด้วย function ต่างๆ เช่น getToken, setToken, loadAuth, refreshAuth, isExpire, refreshIsExpire, และ hasToken
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<TokenResponse | null>(null)

  /**
   * ฟังก์ชันนี้ใช้สำหรับดึง token จาก localStorage และแปลงเป็น TokenResponse object
   * @returns TokenResponse object หากมี token ใน localStorage และ null หากไม่มี
   */
  const getToken = () => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      return (token.value = JSON.parse(localToken) as TokenResponse)
    }
  }

  /**
   * ตัวแปร computed ที่ใช้เก็บค่า boolean ว่ามี token หรือไม่
   */
  const hasToken = computed(() => {
    return token.value !== null
  })

  /**
   * ตรวจสอบว่า token หมดอายุหรือไม่
   * @returns {boolean} คืนค่า true ถ้า token หมดอายุแล้ว ไม่งั้นคืนค่า false
   */
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

  /**
   * ตรวจสอบว่า token สามารถ refresh ได้หรือไม่
   * @returns คืนค่าเป็น boolean ว่า token สามารถ refresh ได้หรือไม่
   */
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
  }

  // transfer token from api & refresh  token
  const transfer = (response: ApiResponse<TokenResponse>) => {
    if (response.code == 0) {
      if (response.result) {
        setToken(response.result)
      }
    }
    if (response.code != 0) {
      console.log(response.code)
      return response.code
    }
  }

  const loadAuth = async (data: LoginRequest) => {
    const res = await Longin(data)
    transfer(res.data)
  }

  const refreshAuth = async (refreshToken: RefreshTokenRequest) => {
    const res = await Refresh(refreshToken)
    return transfer(res.data)
  }

  watchEffect(() => {
    console.log('watchEffect working')
    isExpire()
  })

  return { token, getToken, setToken, loadAuth, refreshAuth, isExpire, refreshIsExpire, hasToken }
})
