import { LoginPage } from "@/pages/Login";
import { RouteRecordRaw } from "vue-router";


export const routeForMenu: Array<RouteRecordRaw> = [



]

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: 'login',
    meta: { isPublic: true, title: '登陆' },
    component: LoginPage
  }
];
