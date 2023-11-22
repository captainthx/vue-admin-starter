import { ConstantPagination } from './enum'
import type { AxiosResponse } from 'axios'

export interface ApiResponse<T> {
  code: number
  text: string
  result: T
}
export interface ListResponse<T> {
  result: T[]
  pagination: PaginationResponse
}

export type ServerResponse<T> = Promise<AxiosResponse<T>>

export type ServerListResponse<T> = Promise<AxiosResponse<ListResponse<T>>>

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

export interface Pagination {
  page: ConstantPagination.DEFAULT_PAGE
  size: ConstantPagination.DEFAULT_LIMIT
}

export interface HistoryLoginResponse {
  id: number
  ipv4: number
  device: string
  uid: number
  cdt: number
  udt: number
}
export interface PaginationResponse {
  current: number
  limit: number
  records: number
  pages: number
}

export interface OrdersResponse {
  id: number
  uid: number
  ordersId: string
  productId: number
  productName: string
  amount: number
  cdt: number
  udt: number
}

export interface ProductResponse {
  id: number
  cdt: number
  udt: number
  categoryId: number
  stockId: number
  stockQuantity: number
  productName: string
  cost: number
  price: number
  productImage: string
  category: Category
}
export interface CreateProductResponse {
  productId: number
  productName: string
  categoryId: number
  stockQuantity: number
  price: number
  cost: number
}

export interface Category {
  id: number
  categoryName: string
}

export interface OrdersParams extends Pagination {
  categoryId?: number
}

export interface CreateProductRequest {
  productName: string
  price: number
  cost: number
  stockQuantity: number
  categoryId: number
}
