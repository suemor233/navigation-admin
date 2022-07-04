import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { useUser } from '@/store/user'

import { Header } from '../Header'
import classes from './index.module.scss'

export const ContentLayout = defineComponent({
  props: {
    actionsElement: {
      type: Object as PropType<JSX.Element | null>,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    header: {
      type: Object as PropType<JSX.Element | null>,
      required: false,
    },
    responsive: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  setup(props, ctx) {
    const { slots } = ctx
    const { updateUserInfo } = useUser()
    updateUserInfo()
    const router = useRouter()
    const route = computed(() => router.currentRoute)
    const pageTitle = computed(() =>
      route.value.value.matched.reduce(
        (t, cur) =>
          t +
          (cur.meta.title
            ? // t 不为空, 补一个 分隔符
              t.length > 0
              ? ` · ${cur.meta.title}`
              : cur.meta.title
            : ''),
        '',
      ),
    )

    return () => (
      <>
        <div
          class={`${classes['bg']} h-full px-10 flex flex-col`}
          style={!props.responsive ? { 'min-width': '1080px' } : ''}
        >
          <header class={classes['header']}>
            <h1 class={classes['title']}>
              {slots.title?.() || pageTitle.value}
            </h1>
            <div class={'pr-10'}>
              <Header>{slots.header?.()}</Header>
            </div>
          </header>
          <div class={'flex-1 pb-10'}>{slots.default?.()}</div>
        </div>
      </>
    )
  },
})
