import QProgress from 'qier-progress'
import { check, checkInit } from '@/api/modules/user'
import { RouteName } from '@/router/name'
import { useUser } from '@/store/user'
import { router } from './router'

const qprogress = new QProgress()
router.beforeEach(async (to) => {
  qprogress.start()
  if (!to.meta.isPublic) {
    const ok = await check()
    if (!ok) {
      const isInit = await checkInit()

      if (isInit.is_init) {
        const { logout } = useUser()

        logout()

        router.push({ name: RouteName.Login })
      } else {
        router.push({ name: RouteName.Setup })
      }
    }
  }
})

router.afterEach((to, _) => {
  qprogress.finish()
})

router.onError(() => {
  return
})
