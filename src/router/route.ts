import { RouteName } from './name';
import { LoginPage } from "@/views/login";
import { RouteRecordRaw } from "vue-router";
import { SidebarLayout } from '@/layouts/sidebar';
import { DashBoardView } from '@/views/dashboard';


export const routeForMenu: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: DashBoardView,
    name: RouteName.Dashboard,
    meta: {
      title: '仪表盘',
    },
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
