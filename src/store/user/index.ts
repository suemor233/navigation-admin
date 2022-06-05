import { setToken } from '@/utils/auth';

import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from "pinia";
import { check, login, } from '@/api/modules/user';


export const useUser = defineStore('useUser', () => {

  const user = ref<IUser | null>(null);

  const userLogin = async (username: string, password: string) => {
    const res = await login({ username, password })
    user.value = res
    updateToken(user.value?.token as string)
    return !!res
  }

  const  updateToken = ($token: string)=> {
    if ($token) {
      setToken($token, 7)
    }

  }

  return {
    user,
    userLogin,
    updateToken
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))