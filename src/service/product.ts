import type {
  CreateProductRequest,
  CreateProductResponse,
  ProductParams,
  ProductResponse,
  ServerResponse,
  ServerListResponse,
  DeleteProductRequest,
  SuccessResponse,
  UpdProductRequest
} from './index.d'
import client from './request'

const GetProductList = (params: ProductParams): ServerListResponse<ProductResponse> =>
  client.get('/v1/product', { params: params })

const CreateProduct = (body: CreateProductRequest): ServerResponse<CreateProductResponse> =>
  client.post('/v1/product', body)

const DeleteProduct = (prarams: DeleteProductRequest): ServerResponse<SuccessResponse> =>
  client.delete('/v1/product', { params: prarams })

const UpdateProduct = (body: UpdProductRequest): ServerResponse<ProductResponse> =>
  client.patch('/v1/product', body)
export { GetProductList, CreateProduct, DeleteProduct, UpdateProduct }
