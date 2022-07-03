import client from '@/api/umi-request'
import { PageType } from '@/models/Page'


export function ipInfo(ip:string) {
  return client.get(`/tool/ip/${ip}`)
}


