import { checkInit, patchUser, register } from '@/api/modules/user'
import { router } from '@/router'
import { RouteName } from '@/router/name'
import { removeToken } from '@/utils'
import { ChevronBack } from '@vicons/ionicons5'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NSpace,
  NStep,
  NSteps,
  useMessage,
} from 'naive-ui'
import {
  computed,
  defineComponent,
  h,
  KeepAlive,
  onBeforeMount,
  PropType,
  reactive,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const toast = useMessage()
    const step = ref(0)

    onBeforeMount(async () => {
      const isInit = await checkInit()
      if (isInit.is_init) {
        toast.info('你已经有主人了')
        router.push(RouteName.Dashboard)
      }
      removeToken()
    })

    const user = reactive({})
    return () => (
      <>
        <div
          class={
            'relative h-screen max-w-xl flex items-center m-auto phone:mx-5'
          }
        >
          <NCard
            title="初始化"
            v-slots={{
              header: (
                <>
                  <div class={'flex items-center'}>
                    {step.value >= 1 && (
                      <NIcon size={'28'}>
                        <button onClick={() => step.value--}>
                          <ChevronBack />
                        </button>
                      </NIcon>
                    )}

                    <span class={'ml-2'}>初始化</span>
                  </div>
                </>
              ),
            }}
          >
            <NSteps size="small" v-model:current={step.value}>
              <NStep
                status={step.value > 0 ? 'finish' : 'process'}
                title="主人创建"
                description="设置主人名称和密码"
              />
              <NStep
                status={
                  step.value > 1
                    ? 'finish'
                    : step.value < 1
                    ? 'wait'
                    : 'process'
                }
                title="完善信息"
                description="填写主人相关信息"
              />
              <NStep
                status={
                  step.value > 2
                    ? 'finish'
                    : step.value < 2
                    ? 'wait'
                    : 'process'
                }
                title="(๑•̀ㅂ•́)و✧"
                description="一切就绪了"
              />
            </NSteps>
            <div class="mt-10">
              <KeepAlive>
                {h([Step1, Step2, Step3][step.value], {
                  onNext: async (data) => {
                    data && Object.assign(user, data)

                    if (step.value === 2) {
                      Object.keys(user).forEach((key) => {
                        if (user[key] === '') {
                          delete user[key]
                        }
                      })
                      const res = await register(user)
                      if (res) {
                        toast.success('创建成功')
                        router.push({ name: RouteName.Login })
                      } else {
                        return
                      }
                    }
                    step.value++
                  },
                })}
              </KeepAlive>
            </div>
          </NCard>
        </div>
      </>
    )
  },
})

const stepFormProps = {
  onNext: {
    type: Function as PropType<(data) => void>,
    required: true,
  },
} as const

const Step1 = defineComponent({
  props: stepFormProps,
  setup(props, ctx) {
    const toast = useMessage()
    const user = reactive({
      username: '',
      password: '',
    })
    const repassword = ref('')

    const handleNext = async () => {
      if (repassword.value !== user.password) {
        toast.error('两次密码不一致')
        return
      }
      props.onNext(user)
    }

    const disabled = computed(
      () => !user.username || !user.password || !repassword.value,
    )
    return () => (
      <>
        <KeepAlive>
          <NForm>
            <NFormItem label="主人名称" required>
              <NInput v-model:value={user.username} />
            </NFormItem>
            <NFormItem label="密码" required>
              <NInput type="password" v-model:value={user.password} />
            </NFormItem>
            <NFormItem label="确认密码" required>
              <NInput
                type="password"
                v-model:value={repassword.value}
                onKeyup={(e: any) =>
                  e.key === 'Enter' && !disabled.value && handleNext()
                }
              />
            </NFormItem>
            <NSpace justify="end">
              <NButton
                disabled={disabled.value}
                onClick={handleNext}
                round
                type="primary"
              >
                下一步
              </NButton>
            </NSpace>
          </NForm>
        </KeepAlive>
      </>
    )
  },
})

const Step2 = defineComponent({
  props: stepFormProps,
  setup(props, ctx) {
    const user = reactive({
      mail: '',
      avatar: '',
      backgroundImage: 'https://y.suemor.com/imagesva2022-255.png',
      introduce: '',
    })
    const handleNext = async () => {
      props.onNext(user)
    }
    return () => (
      <>
        <NForm>
          <NFormItem label="邮箱" required>
            <NInput
              v-model:value={user.mail}
              onKeyup={(e: any) => e.key === 'Enter' && handleNext()}
            />
          </NFormItem>
          <NFormItem label="头像">
            <NInput v-model:value={user.avatar} />
          </NFormItem>
          <NFormItem label="前端背景图片">
            <NInput v-model:value={user.backgroundImage} />
          </NFormItem>
          <NFormItem label="个人介绍">
            <NInput type="textarea" v-model:value={user.introduce} />
          </NFormItem>
          <NSpace justify="end">
            <NButton
              disabled={!user.mail}
              onClick={handleNext}
              round
              type="primary"
            >
              下一步
            </NButton>
          </NSpace>
        </NForm>
      </>
    )
  },
})

const Step3 = defineComponent({
  props: stepFormProps,
  setup(props, ctx) {
    return () => (
      <>
        <NSpace class={'text-center'} vertical>
          <p>真厉害，你已经完成了所有的步骤，点击下方按钮创建用户吧</p>
          <NButton type="primary" round onClick={() => props.onNext()}>
            创建用户
          </NButton>
        </NSpace>
      </>
    )
  },
})
