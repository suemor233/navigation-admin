import client from '@/api/umi-request'

export function aggregateInfo() {
  return client.get('/aggregate/stat')
}
