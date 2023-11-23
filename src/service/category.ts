import type { Category, ServerResponse, Pagination } from './index.d'
import client from './request'

const GetCategoryList = (params: Pagination): ServerResponse<Category[]> =>
  client.get('/v1/category', { params })

export { GetCategoryList }
