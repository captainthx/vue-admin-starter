import { ConstantPagination } from './enum';
import type { AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  code: number;
  text: string;
  result: T;
}
export interface ListResponse<T> {
  result: T[];
  pagination: PaginationResponse;
}

export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export type ServerListResponse<T> = Promise<AxiosResponse<ListResponse<T>>>;

export interface SuccessResponse {
  message: string;
  code: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpire: number;
  refreshTokenExpire: number;
}

export interface TokenPayload {
  iss: number;
  sub: string;
  id: number;
  exp: number;
  iat: number;
}

export interface LoginRequest {
  name: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface Pagination {
  page: ConstantPagination.DEFAULT_PAGE;
  size: ConstantPagination.DEFAULT_LIMIT;
}

export interface HistoryLoginResponse {
  id: number;
  ipv4: number;
  device: string;
  uid: number;
  cdt: number;
  udt: number;
}
export interface PaginationResponse {
  current: number;
  limit: number;
  records: number;
  pages: number;
}
