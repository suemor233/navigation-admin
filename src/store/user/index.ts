import { removeToken, setToken } from '@/utils/auth';

import { onBeforeMount, ref } from 'vue';
import { acceptHMRUpdate, defineStore } from "pinia";
import { check, login, patchUser, userInfo, } from '@/api/modules/user';
import { IUser } from './userType';
import { SettingFormType } from '@/views/setting';

export const useUser = defineStore('useUser', () => {
  const user = ref<IUser | null>(null);

  const userLogin = async (username: string, password: string) => {
    const res = await login({ username, password })
    user.value = res
    updateToken(user.value?.token as string)
    return !!res
  }

  const updateUserInfo = async () => {
    const res = await userInfo()
    if (res) {
      user.value = res
    }
  }

  const patchUserInfo = async (data:SettingFormType) => {
    const res = await patchUser(data)
    if (res) {
      user.value = res
      return res
    }
  }

  const updateToken = ($token: string)=> {
    if ($token) {
      setToken($token, 7)
    }
  }

  const logout = () =>{
    user.value = null
    removeToken()
  }


  return {
    user,
    userLogin,
    updateToken,
    logout,
    updateUserInfo,
    patchUserInfo
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))