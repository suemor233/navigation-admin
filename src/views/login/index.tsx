import { checkInit } from '@/api/modules/user'
import { LoginBg } from '@/components/Login/bg'
import { LoginForm } from '@/components/Login/form'
import { RouteName } from '@/router/name'
import { useMessage } from 'naive-ui'
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const LoginPage = defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const toast = useMessage()
    onBeforeMount(async () => {
      const isInit = await checkInit()
      if (!isInit.is_init) {
        toast.info('请先初始化')
        router.push(RouteName.Setup)
      }
    })

    return () => (
      <>
        <div class={'h-screen flex'}>
          <LoginBg />
          <LoginForm />
        </div>
      </>
    )
  },
})
