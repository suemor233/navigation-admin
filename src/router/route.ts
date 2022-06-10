import { StackView } from './../views/pages/Stack/index';
import { ProjectView } from './../views/pages/Project/index';
import { AboutView } from './../views/pages/About/index';
import { RouteName } from './name';
import { LoginPage } from "@/views/login";
import { RouteRecordRaw } from "vue-router";
import { SidebarLayout } from '@/layouts/sidebar';
import { DashBoardView } from '@/views/dashboard';
import { DashboardOutlined } from '@vicons/antd'
import { renderIcon } from '@/components/Icon';
import { SettingsOutline } from '@vicons/ionicons5';
import { $RouterView } from '@/layouts/router-view';

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
    path: '/pages',
    name: RouteName.Pages,
    meta: {
      title: '页面',
      icon: renderIcon(DashboardOutlined),
    },
    redirect: '/pages/about',
    component: $RouterView,
    children :[
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
        path: 'project',
        component: ProjectView,
        name: RouteName.Project,
        meta: {
          title: '项目',
          icon: renderIcon(DashboardOutlined),
        },
      },
      {
        path: 'stack',
        component: StackView,
        name: RouteName.Stack,
        meta: {
          title: '栈',
          icon: renderIcon(DashboardOutlined),
        },
      },
    
    ]
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
