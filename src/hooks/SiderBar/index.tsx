import { MenuOption, NIcon, useMessage } from 'naive-ui'
import { RouteName } from '@/router/name'
import { DashboardOutlined } from '@vicons/antd'
import { BookOutline as BookIcon, Pencil } from '@vicons/ionicons5'
import { CategoryOutlined, ManageSearchRound } from '@vicons/material'
import { Component, h } from 'vue'
import { Icon } from '@vicons/utils'
import { useRouter } from 'vue-router'

function useSideBar() {
  const router = useRouter()

  const handleUpdateValue = (key: string, item: MenuOption) => {
    router.push(key)
  }
  function renderIcon(icon: Component) {
    return () =>
      h(NIcon, null, {
        default: () =>
          h(
            <Icon color="green" size="20">
              <icon />
            </Icon>,
          ),
      })
  }

  const menuOptions: MenuOption[] = [
    {
      label: '仪表盘',
      key: RouteName.Dashboard,
      icon: renderIcon(DashboardOutlined),
    },
    {
      label: '博文',
      key: RouteName.Post,
      icon: renderIcon(BookIcon),
      children: [
        {
          label: '管理',
          key: RouteName.View,
          icon: renderIcon(ManageSearchRound),
        },
        {
          label: '撰写',
          key: RouteName.Edit,
          icon: renderIcon(Pencil),
        },
        {
          label: '分类',
          key: RouteName.Category,
          icon: renderIcon(CategoryOutlined),
        },
      ],
    },
  ]

  return {
    handleUpdateValue,
    menuOptions,
  }
}

export default useSideBar
