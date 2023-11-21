import type { OrdersParams, ProductResponse, ServerListResponse } from './index.d'
import client from './request'

const GetProductList = (params: OrdersParams): Promise<ServerListResponse<ProductResponse>> =>
  client.get('/v1/product', { params: params })

export { GetProductList }
