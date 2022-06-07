import client from "@/api/umi-request";
import { SettingFormType } from "@/views/setting";


export function login(data: {username?:string,password?:string}) {
    return client.post('/user/login', {data})
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