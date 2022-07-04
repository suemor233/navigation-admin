import { NTabPane, NTabs } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { SettingTab } from '@/common/setting'
import { ContentLayout } from '@/layouts/content'

import { TabSecurity } from './tabs/security'
import { TabUser } from './tabs/user'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const tabValue = ref(route.params.type as string)

    watch(
      () => route.params.type,
      (n) => {
        if (!n) {
          return
        }
        tabValue.value = n as any
      },
    )

    return () => (
      <>
        <ContentLayout responsive={false}>
          <NTabs
            animated
            value={tabValue.value}
            onUpdateValue={(e) => {
              router.replace({ ...route, params: { ...route.params, type: e } })
            }}
          >
            <NTabPane tab="用户" name={SettingTab.User}>
              <TabUser />
            </NTabPane>

            <NTabPane tab="安全" name={SettingTab.Security}>
              <TabSecurity />
            </NTabPane>
          </NTabs>
        </ContentLayout>
      </>
    )
  },
})
