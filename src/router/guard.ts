import { useUser } from '@/store/user';
import { check } from '@/api/modules/user'
import { removeToken } from '@/utils/auth'
import { useMessage } from 'naive-ui'
import QProgress from 'qier-progress'
import { router } from './router'



const qprogress = new QProgress()
router.beforeEach(async (to) => {
  qprogress.start()
  if (!to.meta.isPublic) {
    const ok = await check()
    if (!ok) {
      const { logout } = useUser()
      logout()
      return '/Login'
    }
  }else{
    const { logout } = useUser()
    logout()
  }
})

router.afterEach((to, _) => {
  qprogress.finish()
})

router.onError(() => {
  return
})
