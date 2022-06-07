import { defineComponent, onBeforeMount } from 'vue'
import { NLayout, NSpace } from 'naive-ui'
import { SideBar } from '@/components/sidebar'
import { $RouterView } from '../router-view'
import { useUser } from '@/store/user'

export const SidebarLayout = defineComponent({
  setup(props, ctx) {
    const {updateUserInfo} = useUser()
    return () => (
      <>
        <NSpace vertical size="large">
          <NLayout class={'h-screen'} has-sider>
            <SideBar />
            <NLayout>
              <$RouterView />
            </NLayout>
          </NLayout>
        </NSpace>
      </>
    )
  },
})
