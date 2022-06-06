import { RouteName } from './name';
import { LoginPage } from "@/views/login";
import { RouteRecordRaw } from "vue-router";
import { SidebarLayout } from '@/layouts/sidebar';
import { DashBoardView } from '@/views/dashboard';
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/components/Icon';
import { SettingsOutline } from '@vicons/ionicons5';

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
    path: '/setting',
    redirect: '/setting/user',
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
    path: "/login",
    name: RouteName.Login,
    meta: { isPublic: true, title: '登陆' },
    component: LoginPage
  }
];
