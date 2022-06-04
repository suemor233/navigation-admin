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
} from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'

interface LoginFormType {
  username: string
  password: string
}

export const LoginForm = defineComponent({
  setup(props, ctx) {
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColorHover: '#3554D1',
        primaryColor: '#3554D1',
        primaryColorPressed: '#3554D1',
      },
    }
    const formRef = ref<FormInst | null>(null)

    const loginForm = reactive<LoginFormType>({
      username: '',
      password: '',
    } )

    const rules: FormRules = {
      username: [
        {
          required:true,
          message: '请输入用户名',
        },
      ],
      password: [
        {
          required:true,
          message: '请输入密码',
        },
      ],
    }

    const handleForm = (e:MouseEvent) => {
        e.preventDefault()
        console.log(loginForm);
        formRef.value?.validate(async (errors) => {
          if (errors) {
            return
          }

  
        })
    }
    return () => (
      <>
        <div class={'md:w-1/2 xl:w-2/5 w-full flex items-center'}>
          <NConfigProvider
            class={'w-2/3 m-auto'}
            themeOverrides={themeOverrides}
          >
            <p class={'text-3xl'}>登录</p>
            <div class={'w-full mt-8'}>
              <NForm ref={formRef} model={loginForm} rules={rules}>
                <NSpace vertical>
                  <NFormItem path="username" label="用户名">
                    <NInput v-model:value={loginForm.username} placeholder={'请输入用户名'} />
                  </NFormItem>
                  <NFormItem path="password" label="密码">
                    <NInput v-model:value={loginForm.password} type="password" placeholder={'请输入密码'} />
                  </NFormItem>
                </NSpace>
              </NForm>
              <div>
                <NCheckbox>自动登录</NCheckbox>
              </div>
              <div class={'mt-8'}>
                <NButton onClick={handleForm} type="primary" block={true} size={'large'} round>
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
