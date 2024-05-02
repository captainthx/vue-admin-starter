import type { LoginRequest, RefreshTokenRequest, TokenResponse, ServerResponse } from '@/types';
import client from './request';

const longin = (body: LoginRequest): ServerResponse<TokenResponse> =>
  client.post('/v1/auth/login', body);

const refresh = (body: RefreshTokenRequest): ServerResponse<TokenResponse> =>
  client.post('/v1/auth/refresh', body);

export { longin, refresh };
