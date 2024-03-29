import client from '@/api/umi-request'
import type { PageType } from '@/models/Page'

export function analyzeInfo(params: PageType) {
  return client.get('/analyze', { params })
}

export function charInfo() {
  return client.get('/analyze/aggregate')
}

export function deleteAnalyzeAll() {
  return client.delete('/analyze')
}
