import { computed, ComputedRef, defineComponent, ref, watch } from 'vue'
import {
  GlobalThemeOverrides,
  NLayoutSider,
  NMenu,
  NConfigProvider,
  NAvatar,
} from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import classes from './index.module.scss'
import useSideBar from '@/hooks/SiderBar'
import { useMediaQuery } from '@vueuse/core'
import { useUser } from '@/store/user'
import { storeToRefs } from 'pinia'
import Avatar from '../avatar'

export const SideBar = defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const { user } = storeToRefs(useUser())
    const { menuOptions, handleUpdateValue } = useSideBar()
    const isLargeScreen = useMediaQuery('(min-width: 960px)')
    const collapsed = ref(!isLargeScreen.value)

    watch(isLargeScreen, () => {
      collapsed.value = !isLargeScreen.value
    })

    const fullPathValue: ComputedRef<string> = computed(() => {
      if (route.name === 'setting') {
        return '/' + route.name
      }

      return route.fullPath
    })
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        hoverColor: '#d4e6df',
      },
    }

    return () => (
      <>
        <NLayoutSider
          bordered
          collapseMode={'width'}
          collapsedWidth={64}
          width={240}
          collapsed={collapsed.value}
          showTrigger
          onCollapse={() => (collapsed.value = true)}
          onExpand={() => (collapsed.value = false)}
          class={classes.side}
        >
          <div class={classes.avatar}>
            <div onClick={() => router.push('/dashboard')}>
              <Avatar
                size={collapsed.value ? 50 : 100}
                src={user.value?.avatar}
              />
            </div>

            {!collapsed.value ? (
              <p onClick={() => router.push('/dashboard')}>
                {user.value?.username}
              </p>
            ) : undefined}
          </div>
          <NConfigProvider themeOverrides={themeOverrides}>
            <NMenu
              options={menuOptions}
              collapsed={collapsed.value}
              collapsedWidth={64}
              collapsedIconSize={22}
              onUpdateValue={handleUpdateValue}
              value={fullPathValue.value}
            />
          </NConfigProvider>
        </NLayoutSider>
      </>
    )
  },
})
