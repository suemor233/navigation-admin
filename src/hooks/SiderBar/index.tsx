import { MenuOption } from 'naive-ui'
import { RouteName } from '@/router/name'
import { DashboardOutlined } from '@vicons/antd'
import {
  BookOutline as BookIcon,
  Pencil,
  SettingsOutline,
} from '@vicons/ionicons5'
import { OrderDetails } from '@vicons/carbon'

import { useRouter } from 'vue-router'
import { renderIcon } from '@/components/Icon'

function useSideBar() {
  const router = useRouter()
  const handleUpdateValue = (key: string, item: MenuOption) => {
    router.push(key)
  }

  const menuOptions: MenuOption[] = [
    {
      label: '仪表盘',
      key: '/' + RouteName.Dashboard,
      icon: renderIcon(DashboardOutlined),
    },
    {
      label: '页面',
      key: RouteName.Pages,
      icon: renderIcon(DashboardOutlined),
      children: [
        {
          label: '关于',
          key: '/' + RouteName.Pages + '/' + RouteName.About,
          icon: renderIcon(OrderDetails),
        },
        {
          label: '项目',
          key: '/' + RouteName.Pages + '/' + RouteName.Project,
          icon: renderIcon(Pencil),
        },
        {
          label: '技术栈',
          key: '/' + RouteName.Pages + '/' + RouteName.Stack,
          icon: renderIcon(DashboardOutlined),
        },
      ],
    },
    {
      label: '设定',
      key: '/setting/' + RouteName.User,
      icon: renderIcon(SettingsOutline),
    },
  ]
  return {
    handleUpdateValue,
    menuOptions,
  }
}

export default useSideBar
