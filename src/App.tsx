import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  useMessage,
  zhCN,
} from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <NConfigProvider locale={zhCN}>
          <NMessageProvider>
            <NDialogProvider>
              <messageWrapper />
            </NDialogProvider>
          </NMessageProvider>
        </NConfigProvider>
      </>
    )
  },
})

export const messageWrapper = defineComponent({
  setup(props, ctx) {
    window.$message = useMessage()
    return () => (
      <>
        <router-view />
      </>
    )
  },
})
