import { MenuOption } from 'naive-ui'
import { RouteName } from '@/router/name'
import { DashboardOutlined } from '@vicons/antd'
import {
  BookOutline as BookIcon,
  FlaskOutline,
  SettingsOutline,
} from '@vicons/ionicons5'
import { OrderDetails } from '@vicons/carbon'

import { useRouter } from 'vue-router'
import { renderIcon } from '@/components/Icon'
import Eye from '@vicons/tabler/es/Eye'
import Pencil from '@vicons/tabler/es/Pencil'
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
      label: '关于',
      key: '/' + RouteName.About,
      icon: renderIcon(OrderDetails),
    },
    {
      label: '项目',
      key: '/' + RouteName.Projects,
      icon: renderIcon(FlaskOutline),
      children: [
        {
          label: '项目列表',
          key: '/' + RouteName.Projects + '/' + RouteName.ListProject + '?page=1',
          icon: renderIcon(Eye),
        },
        {
          label: '创建项目',
          key: '/' + RouteName.Projects + '/' + RouteName.EditProject,
          icon: renderIcon(Pencil),
        },
      ],
    },
    {
      label: '技术栈',
      key: '/' + RouteName.Stack,
      icon: renderIcon(DashboardOutlined),
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
