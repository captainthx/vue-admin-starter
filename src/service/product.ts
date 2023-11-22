import type {
  CreateProductRequest,
  CreateProductResponse,
  OrdersParams,
  ProductResponse,
  ServerResponse,
  ServerListResponse
} from './index.d'
import client from './request'

const GetProductList = (params: OrdersParams): ServerListResponse<ProductResponse> =>
  client.get('/v1/product', { params: params })

const CreateProduct = (body: CreateProductRequest): ServerResponse<CreateProductResponse> =>
  client.post('/v1/product', body)

export { GetProductList, CreateProduct }
