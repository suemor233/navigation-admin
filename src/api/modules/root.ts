import client from '@/api/umi-request'

export function clean_redis() {
  return client.get('/clean_redis')
}
