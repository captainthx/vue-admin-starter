import dayjs from 'dayjs'

export function formatDate(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
