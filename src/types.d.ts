import { MessageApi, useDialog, useNotification } from 'naive-ui'
import { VNodeProps } from 'vue'

declare global {
  export interface Window {
 

    [K: string]: any
  }




  // @ts-ignore
  export const __DEV__: boolean
  export type KV = Record<string, any>
}

export {}
