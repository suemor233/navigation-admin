import { checkInit, userInfo } from '@/api/modules/user'
import styles from './index.module.scss'
import { RouteName } from '@/router/name'
import { NAvatar, NButton, useMessage } from 'naive-ui'
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginInput } from '@/components/input/login-input'
import { useUser } from '@/store/user'

interface LoginUserType {
  username: string
  password: string
  avatar: string
}
export default defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const toast = useMessage()
    const shake = ref(false)

    const user = reactive<LoginUserType>({
      username: '',
      password: '',
      avatar: '',
    })
    const { userLogin } = useUser()
    onBeforeMount(async () => {
      const isInit = await checkInit()
      if (!isInit.is_init) {
        toast.info('请先初始化')
        router.push(RouteName.Setup)
      }
    })

    onMounted(async () => {
      const res = await userInfo()
      if (res) {
        Object.assign(user, res)
      }
    })

    const handleLogin = async () => {
      if (!user.password) return
      const res = await userLogin(user.username, user.password)
      if (res) {
        toast.success('登录成功')
        router.push({
          name: RouteName.Dashboard,
        })
      } else {
        shake.value = true
        setTimeout(() => {
          shake.value = false
        }, 1000)
      }
    }
    return () => (
      <>
        <div class={styles['wrapper']}>
          <NAvatar round size={130} src={user.avatar} />

          <div class={styles['name']}>
            <p>{user.username}</p>
          </div>
          <LoginInput
            shake={shake.value}
            value={user.password}
            onChange={(value) => {
              user.password = value
            }}
            disabled={!!!user.password.length}
            onClick={handleLogin}
          />
        </div>
      </>
    )
  },
})
