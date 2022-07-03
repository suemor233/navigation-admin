import { defineComponent } from 'vue'
import { NLayout, NSpace } from 'naive-ui'
import { SideBar } from '@/components/sidebar'
import { $RouterView } from '../router-view'

export const SidebarLayout = defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <NSpace vertical size="large">
          <NLayout class={'h-screen'} has-sider>
              <SideBar />
            <div class={'overflow-x-auto w-full'}>
              <$RouterView />
            </div>
          </NLayout>
        </NSpace>
      </>
    )
  },
})
