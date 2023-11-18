import type { LoginRequest, RefreshTokenRequest, ServerResponse, TokenResponse } from './index.d'
import client from './request'

const Longin = (data: LoginRequest): Promise<ServerResponse<TokenResponse>> =>
  client.post('/v1/auth/signIn', data)

const Refresh = (refreshToken: RefreshTokenRequest): Promise<ServerResponse<TokenResponse>> =>
  client.post('/v1/auth/refresh', refreshToken)

export { Longin, Refresh }
