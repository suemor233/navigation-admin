import {
  GlobalThemeOverrides,
  NConfigProvider,
  NMessageProvider,
  useMessage,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        hoverColor: '#d4e6df',
      },
    }

    return () => (
      <>
        <NConfigProvider themeOverrides={themeOverrides}>
          <NMessageProvider>
            <messageWrapper/>
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
      <div>
        <router-view />
      </div>
    )
  },
})
