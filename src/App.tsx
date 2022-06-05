import { NMessageProvider, useMessage } from 'naive-ui'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup(props, ctx) {

    return () => (
      <>
        <NMessageProvider>
          <router-view />
        </NMessageProvider>
      </>
    )
  },
})
