import type { MenuOption } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

import  renderIcon  from '@/components/icons/green-icon'
import { RouteName } from '@/router/name'
import { DashboardOutlined } from '@vicons/antd'
import { OrderDetails } from '@vicons/carbon'
import {
  BuildOutline,
  FlaskOutline,
  PulseOutline,
  SettingsOutline,
} from '@vicons/ionicons5'
import Eye from '@vicons/tabler/es/Eye'
import Pencil from '@vicons/tabler/es/Pencil'

function useSideBar() {
  const router = useRouter()
  const route = useRoute()
  const currentPage = ref(route.query.page || 1)
  const handleUpdateValue = (key: string, item: MenuOption) => {
    if (key.includes('page')) {
      router.push(handeleStr(key))
    } else {
      router.push(key)
    }
  }

  const resetPage = () => {
    currentPage.value = 1
  }

  const handeleStr = (str: string) => {
    const length = str.length
    const newArr = str.split('')
    newArr[length - 1] = '1'
    return newArr.join('')
  }

  const menuOptions: MenuOption[] = reactive([
    {
      label: '仪表盘',
      key: `/${RouteName.Dashboard}`,
      icon: renderIcon(DashboardOutlined),
    },

    {
      label: '关于',
      key: `/${RouteName.About}`,
      icon: renderIcon(OrderDetails),
      children: [
        {
          label: '关于列表',
          key: `/${RouteName.About}/${RouteName.List}?page=${currentPage.value}`,
          icon: renderIcon(Eye),
        },
        {
          label: '创建介绍',
          key: `/${RouteName.About}/${RouteName.Edit}`,
          icon: renderIcon(Pencil),
        },
      ],
    },
    {
      label: '项目',
      key: `/${RouteName.Projects}`,
      icon: renderIcon(FlaskOutline),
      children: [
        {
          label: '项目列表',
          key: `/${RouteName.Projects}/${RouteName.List}?page=${currentPage.value}`,
          icon: renderIcon(Eye),
        },
        {
          label: '创建项目',
          key: `/${RouteName.Projects}/${RouteName.Edit}`,
          icon: renderIcon(Pencil),
        },
      ],
    },
    {
      label: '技术栈',
      key: `/${RouteName.Stack}`,
      icon: renderIcon(BuildOutline),
    },
    {
      label: '分析',
      key: `/${RouteName.Analyze}?page=${currentPage.value}`,
      icon: renderIcon(PulseOutline),
    },

    {
      label: '设定',
      key: '/setting',
      icon: renderIcon(SettingsOutline),
    },
  ])
  return {
    handleUpdateValue,
    menuOptions,
    resetPage,
  }
}

export default useSideBar
