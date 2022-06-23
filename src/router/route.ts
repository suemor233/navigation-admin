import { StackView } from './../views/pages/Stack/index';
import { AboutView } from './../views/pages/About/index';
import { RouteName } from './name';
import { LoginPage } from "@/views/login";
import Setuplayout from "@/layouts/setup-view";
import { RouteRecordRaw } from "vue-router";
import { SidebarLayout } from '@/layouts/sidebar';
import { DashBoardView } from '@/views/dashboard';
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/components/Icon';
import { BuildOutline, FlaskOutline, SettingsOutline } from '@vicons/ionicons5';
import { $RouterView } from '@/layouts/router-view';
import Eye from '@vicons/tabler/es/Eye'
import Pencil from '@vicons/tabler/es/Pencil'
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
    component: AboutView,
    name: RouteName.About,
    meta: {
      title: '关于',
      icon: renderIcon(DashboardOutlined),
    },
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
        component: () => import('../views/pages/Project/list'),
      },
      {
        path: 'edit',
        name: RouteName.EditProject,
        meta: {
          title: '创建项目',
          icon: renderIcon(Pencil),
        },
        component: () => import('../views/pages/Project/edit'),
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
    path: "/",
    component:Setuplayout,
    redirect: '/login',
    children:[
      {
        path: "/setup",
        name: RouteName.Setup,
        meta: { isPublic: true, title: '初始化' },
        component: () => import('../views/setup'),
      },
      {
        path: "/login",
        name: RouteName.Login,
        meta: { isPublic: true, title: '登陆' },
        component: () => import('../views/login/index'),
      },
    ]
  },
 
];
