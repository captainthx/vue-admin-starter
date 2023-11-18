import type { AxiosResponse } from 'axios'

export interface ApiResponse<T> {
  code: number
  text: string
  result: T
}

export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  accessExpire: number
  refreshExpire: number
}

export interface TokenPayload {
  iss: number
  sub: string
  id: number
  exp: number
  iat: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
