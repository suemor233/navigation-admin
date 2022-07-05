import type { RouteRecordRaw } from 'vue-router'

import  renderIcon  from '@/components/icons/green-icon'
import { $RouterView } from '@/layouts/router-view'
import Setuplayout from '@/layouts/setup-view'
import { SidebarLayout } from '@/layouts/sidebar'
import { DashBoardView } from '@/views/dashboard'
import { DashboardOutlined } from '@vicons/antd'
import {
  BuildOutline,
  FlaskOutline,
  PulseOutline, 
  SettingsOutline,
} from '@vicons/ionicons5'
import Eye from '@vicons/tabler/es/Eye'
import Pencil from '@vicons/tabler/es/Pencil'
import { StackView } from '../views/stack/index'
import { RouteName } from './name'

export const routeForMenu: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: DashBoardView,
    name: RouteName.Dashboard,
    meta: {
      title: '仪表盘',
      icon: renderIcon(DashboardOutlined),
    },
  },
  {
    path: 'about',
    component: $RouterView,
    name: RouteName.About,
    meta: {
      title: '关于',
      icon: renderIcon(DashboardOutlined),
    },
    children: [
      {
        path: 'list',
        name: RouteName.ListAbout,
        meta: {
          title: '关于列表',
          query: { page: 1 },
          icon: renderIcon(Eye),
        },
        component: () => import('../views/about/list'),
      },
      {
        path: 'edit',
        name: RouteName.EditAbout,
        meta: {
          title: '创建介绍',
          icon: renderIcon(Pencil),
        },
        component: () => import('../views/about/edit'),
      },
    ],
  },
  {
    path: 'projects',
    component: $RouterView,
    name: RouteName.Projects,
    meta: {
      title: '项目',
      icon: renderIcon(FlaskOutline),
    },
    children: [
      {
        path: 'list',
        name: RouteName.ListProject,
        meta: {
          title: '项目列表',
          query: { page: 1 },
          icon: renderIcon(Eye),
        },
        component: () => import('../views/project/list'),
      },
      {
        path: 'edit',
        name: RouteName.EditProject,
        meta: {
          title: '创建项目',
          icon: renderIcon(Pencil),
        },

        component: () => import('../views/project/edit'),
      },
    ],
  },
  {
    path: 'stack',
    component: StackView,
    name: RouteName.Stack,
    meta: {
      title: '栈',
      icon: renderIcon(BuildOutline),
    },
  },
  {
    path: 'analyze',
    component: () => import('../views/analzye'),
    name: RouteName.Analyze,
    meta: {
      title: '数据',
      icon: <PulseOutline />,
      query: { page: 1 },
    },
  },
  {
    path: '/setting',
    redirect: '/setting/user',
    name: RouteName.UserSetting,
    meta: {
      title: '设定',
      icon: renderIcon(SettingsOutline),
      params: { type: 'user' },
    },
    component: () => null,
  },

  {
    path: '/setting/:type',
    name: RouteName.Setting,
    meta: {
      title: '设定',
      params: { type: 'user' },
      hide: true,
    },
    component: () => import('../views/setting'),
  },
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: SidebarLayout,
    name: RouteName.Home,
    redirect: '/dashboard',
    children: [...routeForMenu],
  },
  {
    path: '/',
    component: Setuplayout,
    redirect: '/login',
    children: [
      {
        path: '/setup',
        name: RouteName.Setup,
        meta: { isPublic: true, title: '初始化' },
        component: () => import('../views/setup'),
      },
      {
        path: '/login',
        name: RouteName.Login,
        meta: { isPublic: true, title: '登陆' },
        component: () => import('../views/login/index'),
      },
    ],
  },
]
