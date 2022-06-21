import client from "@/api/umi-request";
import { SettingFormType } from "@/views/setting";

type userBaseType = {
    username:string,
    password:string
}

export function login(data:userBaseType) {
    return client.post('/user/login', {data})
}

export function register(data:SettingFormType) {
    return client.post('/user/register',{data})
}

export function userInfo() {
    return client.get('/user')
}

export function patchUser(data:SettingFormType) {
    return client.patch('/user',{data})
}

export function check() {
    return client.get('/user/check_logged')
}

export function checkInit() {
    return client.get('/user/init')
}