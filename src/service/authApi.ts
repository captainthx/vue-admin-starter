import type { LoginRequest, RefreshTokenRequest, TokenResponse, ServerResponse } from './index.d'
import client from './request'

const Longin = (data: LoginRequest): ServerResponse<TokenResponse> =>
  client.post('/v1/auth/login', data)

const Refresh = (refreshToken: RefreshTokenRequest): ServerResponse<TokenResponse> =>
  client.post('/v1/auth/refresh', refreshToken)

export { Longin, Refresh }
