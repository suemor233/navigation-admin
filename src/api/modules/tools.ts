import client from '@/api/umi-request'

export function ipInfo(ip: string) {
  return client.get(`/tool/ip/${ip}`)
}
