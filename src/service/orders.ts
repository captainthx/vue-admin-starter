import type { OrdersResponse, Pagination, ServerListResponse } from './index.d'
import cilent from './request'

const Getorders = (params: Pagination): Promise<ServerListResponse<OrdersResponse>> =>
  cilent.get('/v1/orders', { params })

export { Getorders }
