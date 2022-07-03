import client from '@/api/umi-request'
import { PageType } from '@/models/Page'


export function analyzeInfo(params:PageType) {
  return client.get('/analyze',{params})
}

export function deleteAnalyzeAll() {
  return client.delete('/analyze')
}
