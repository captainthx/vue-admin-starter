import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { LoginRequest, RefreshTokenRequest, ServerResponse, TokenResponse } from './index.d'
import client from './request'
import type { AxiosResponse } from 'axios'

const Longin = (data: LoginRequest): Promise<AxiosResponse<TokenResponse>> =>
  client.post('/v1/auth/login', data)

const Refresh = (refreshToken: RefreshTokenRequest): Promise<AxiosResponse<TokenResponse>> =>
  client.post('/v1/auth/refresh', refreshToken)

export { Longin, Refresh }
