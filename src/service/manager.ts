import type { ServerListResponse, AdminLogsResponse, Pagination } from './index.d'
import client from './request'

const GetAdminLogsList = (params: Pagination): ServerListResponse<AdminLogsResponse> =>
  client.get('/v1/manager', { params: params })

export { GetAdminLogsList }
