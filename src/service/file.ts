import type { ServerResponse, ImageUpaloadResponse } from './index.d'
import client from './request'

const UpLoadImage = (body: FormData): ServerResponse<ImageUpaloadResponse> =>
  client.post('/v1/image', body)

export { UpLoadImage }
