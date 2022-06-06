import { RouteName } from '@/router/name'
import { useUser } from '@/store/user'
import {
  FormInst,
  FormRules,
  GlobalThemeOverrides,
  NButton,
  NCheckbox,
  NConfigProvider,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  useMessage,
} from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface LoginFormType {
  username: string
  password: string
}

export const LoginForm = defineComponent({
  setup(props, ctx) {

    const { userLogin } = useUser()
    const router = useRouter()
    const toast = useMessage()
    const formRef = ref<FormInst | null>(null)

    const loginForm = reactive<LoginFormType>({
      username: '',
      password: '',
    })

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColorHover: '#3554D1',
        primaryColor: '#3554D1',
        primaryColorPressed: '#3554D1',
      },
    }

    const rules: FormRules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
    }

    
    const handleForm = async (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate(async (errors) => {
        if (errors) {
          return
        }
        const login = await userLogin(loginForm.username, loginForm.password)
        if (login) {
          toast.success('登录成功')
          router.push({
            name: RouteName.Dashboard
          })          
        }
        
      })
    }
  
    return () => (
      <>
        <div class={'md:w-1/2 xl:w-2/5 w-full flex items-center'}>
          <NConfigProvider themeOverrides={themeOverrides}
            class={'w-2/3 m-auto'}
          >
            <p class={'text-3xl'}>登录</p>
            <div class={'w-full mt-8'}>
              <NForm ref={formRef} model={loginForm} rules={rules}>
                <NSpace vertical>
                  <NFormItem path="username" label="用户名">
                    <NInput
                      size="large"
                      v-model:value={loginForm.username}
                      placeholder={'请输入用户名'}
                    />
                  </NFormItem>
                  <NFormItem path="password" label="密码">
                    <NInput
                      size="large"
                      v-model:value={loginForm.password}
                      type="password"
                      placeholder={'请输入密码'}
                      onKeyup={(e: any) =>
                        e.key === 'Enter' ? handleForm(e) : ''
                      }
                    />
                  </NFormItem>
                </NSpace>
              </NForm>
    
              <div class={'mt-4'}>
                <NButton
                  onClick={handleForm}
                  type="primary"
                  block={true}
                  size={'large'}
                  round
                >
                  登录
                </NButton>
              </div>
            </div>
          </NConfigProvider>
        </div>
      </>
    )
  },
})
