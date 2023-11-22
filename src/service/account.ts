import type { HistoryLoginResponse, Pagination, ServerListResponse } from './index.d'
import client from './request'

const HistoryLogin = (params: Pagination): ServerListResponse<HistoryLoginResponse> =>
  client.get('/v1/account', { params })

export { HistoryLogin }
