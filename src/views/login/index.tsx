import { checkInit, userInfo } from '@/api/modules/user'
import styles from './index.module.scss'
import { RouteName } from '@/router/name'
import { NAvatar, NButton, useMessage } from 'naive-ui'
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  watch,
} from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/modules/user'
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
      const res = await userLogin(user.username,user.password)
      if (res) {
        toast.success('登录成功')
        router.push({
          name: RouteName.Dashboard,
        })
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
