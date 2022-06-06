import { removeToken, setToken } from '@/utils/auth';

import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from "pinia";
import { check, login, userInfo, } from '@/api/modules/user';


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
    user.value = res
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
    updateUserInfo
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))