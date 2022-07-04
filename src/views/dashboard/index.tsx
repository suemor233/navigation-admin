import { fetchHitokoto, SentenceType } from '@/api/modules/hitokoto'
import {
  BasicIcon,
  ChatbubblesSharpIcon,
  CopyIcon,
  FlaskIcon,
  PencilIcon,
  RedisIcon,
  RefreshIcon,
  StackIcon,
} from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { Icon } from '@vicons/utils'
import {
  NButton,
  NCard,
  NGi,
  NGrid,
  NH1,
  NH3,
  NH4,
  NP,
  NPopover,
  NSpace,
  NText,
  useMessage,
} from 'naive-ui'
import { defineComponent } from 'vue'
import { pick } from 'lodash-es'
import { getJinRiShiCiOne, verseDataType } from '@/api/modules/jinrishici'
import { useUser } from '../../store/user/index'
import { parseDate } from '@/utils'
import { Card, CardProps } from './card'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router/name'
import { aggregateInfo } from '../../api/modules/aggregate'
import { clean_redis } from '@/api/modules/root'
import { Stat } from '@/models/stat'

export const DashBoardView = defineComponent({
  setup(props, ctx) {
    const toast = useMessage()
    const userStore = useUser()
    const router = useRouter()
    const stat = ref(
      new Proxy(
        {},
        {
          get() {
            return 'N/A'
          },
        },
      ) as Stat,
    )
    const refreshHitokoto = () => {
      fetchHitokoto([
        SentenceType.动画,
        SentenceType.原创,
        SentenceType.哲学,
        SentenceType.文学,
      ]).then((data) => {
        const postfix = Object.values(
          pick(data, ['from', 'from_who', 'creator']),
        ).filter(Boolean)[0]
        if (!data.hitokoto) {
          hitokoto.value = '没有获取到句子信息'
        } else {
          hitokoto.value = data.hitokoto + (postfix ? ` —— ${postfix}` : '')
        }
      })
    }

    const fetchStat = async () => {
      const counts = await aggregateInfo()
      stat.value = counts
      statTime.value = new Date()
    }

    const statTime = ref(null as unknown as Date)
    const hitokoto = ref('')
    const verse = ref('')
    const verseData = ref<verseDataType | null>(null)
    onBeforeMount(() => {
      refreshHitokoto()
      getJinRiShiCiOne().then((data) => {
        verse.value = data.content
        verseData.value = data
      })
      fetchStat()
    })

    const UserLoginStat = defineComponent(() => () => (
      <>
        <NH3 class={'font-light'}>登录记录</NH3>
        <NSpace vertical>
          <NP class={'font-normal'}>
            <span>
              上次登录 IP:{' '}
              {userStore.user?.lastLoginIp ? userStore.user?.lastLoginIp : 'NA'}
            </span>
          </NP>
          <NP class={'font-normal'}>
            <span>
              上次登录时间 :{' '}
              {userStore.user?.lastLoginTime ? (
                <time>
                  {parseDate(
                    userStore.user?.lastLoginTime,
                    'yyyy年M月d日 HH:mm:ss',
                  )}
                </time>
              ) : (
                'NA'
              )}
            </span>
          </NP>
        </NSpace>
      </>
    ))

    const dataStat = computed<CardProps[]>(() => [
      {
        label: '基本信息',
        value: stat.value.aboutBasic,
        icon: <BasicIcon />,
        actions: [
          {
            name: '管理',
            primary: true,
            onClick() {
              router.push({ name: RouteName.ListAbout })
            },
          },
        ],
      },
      {
        label: '简要介绍',
        value: stat.value.aboutDetail,
        icon: <PencilIcon />,
        actions: [
          {
            name: '撰写',
            primary: true,
            onClick() {
              router.push({ name: RouteName.EditAbout })
            },
          },
          {
            name: '管理',
            onClick() {
              router.push({ name: RouteName.ListAbout })
            },
          },
        ],
      },
      {
        label: '项目',
        value: stat.value.project,
        icon: <FlaskIcon />,
        actions: [
          {
            name: '撰写',
            primary: true,
            onClick() {
              router.push({ name: RouteName.EditProject })
            },
          },
          {
            name: '管理',
            onClick() {
              router.push({ name: RouteName.ListProject })
            },
          },
        ],
      },
      {
        label: '技术栈',
        value: stat.value.stack,
        icon: <StackIcon />,
        actions: [
          {
            name: '管理',
            primary: true,
            onClick() {
              router.push({ name: RouteName.Stack })
            },
          },
        ],
      },
      {
        label: '社交平台',
        value: stat.value.socialIds,
        icon: <ChatbubblesSharpIcon />,
        actions: [
          {
            name: '管理',
            primary: true,
            onClick() {
              router.push({ name: RouteName.UserSetting })
            },
          },
        ],
      },
      {
        label: '缓存',
        value: 'Redis',
        icon: <RedisIcon />,
        actions: [
          {
            primary: false,
            name: '清除数据缓存',
            onClick() {
              clean_redis().then(() => {
                toast.success('清除成功')
              })
            },
          },
        ],
      },
    ])

    const DataStat = defineComponent(() => () => (
      <>
        <NH3 class={'font-light'}>数据统计</NH3>
        <NP class={'font-normal flex items-center'}>
          <span>数据更新于 : </span>

          <time>
            {statTime.value
              ? parseDate(statTime.value, 'yyyy年M月d日 HH:mm:ss')
              : 'N/A'}
          </time>
          <NButton text onClick={fetchStat} class="ml-4 text-black">
            <Icon>
              <RefreshIcon />
            </Icon>
          </NButton>
        </NP>

        <NGrid
          xGap={20}
          yGap={20}
          cols={'2 100:1 400:2 600:3 900:4 1200:5 1600:6'}
        >
          {dataStat.value.map((props) => (
            <NGi key={props.label}>
              <Card {...props} />
            </NGi>
          ))}
        </NGrid>
      </>
    ))
    return () => (
      <>
        <ContentLayout>
          <NH1 class="font-light">欢迎回来</NH1>
          <NGrid xGap={12} cols={'1 900:2'}>
            <NGi>
              <NH3 class={'font-light !mt-5'}>一言</NH3>
              <NP>
                <NSpace align="center" class="min-h-[3rem]">
                  {hitokoto.value ? (
                    <>
                      <NText class="leading-normal">{hitokoto.value}</NText>
                      <div class="space-x-2 flex items-center">
                        <NButton
                          text
                          onClick={refreshHitokoto}
                          class="ml-0 phone:float-right"
                        >
                          <Icon>
                            <RefreshIcon />
                          </Icon>
                        </NButton>

                        <NButton
                          text
                          onClick={() => {
                            navigator.clipboard.writeText(hitokoto.value)
                            toast.success('已复制')
                          }}
                        >
                          <Icon>
                            <CopyIcon />
                          </Icon>
                        </NButton>
                      </div>
                    </>
                  ) : (
                    <NText>加载中...</NText>
                  )}
                </NSpace>
              </NP>
            </NGi>
            <NGi>
              <NH3 class={'font-light !mt-5'}>今日诗句</NH3>
              <NP>
                <NPopover trigger={'hover'} placement="bottom">
                  {{
                    trigger() {
                      return <NText>{verse.value || '获取中'}</NText>
                    },
                    default() {
                      const origin = verseData.value?.origin
                      if (!origin) {
                        return null
                      }
                      return (
                        <NCard
                          class="text-center box-border max-w-[65vw] max-h-[60vh] overflow-auto"
                          bordered={false}
                        >
                          <NH3 class={'sticky top-0 bg-white py-2'}>
                            {origin.title}
                          </NH3>
                          <NH4>
                            【{origin.dynasty.replace(/代$/, '')}】
                            {origin.author}
                          </NH4>
                          <div class={'px-6'}>
                            {origin.content.map((c) => (
                              <NP key={c} class="flex">
                                {c}
                              </NP>
                            ))}
                          </div>
                        </NCard>
                      )
                    },
                  }}
                </NPopover>
              </NP>
            </NGi>
          </NGrid>
          <UserLoginStat />
          <DataStat />
        </ContentLayout>
      </>
    )
  },
})
