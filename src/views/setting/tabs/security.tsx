import type { FormInst } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { RouteName } from '@/router/name'
import { useUser } from '@/store/user'

export const autosizeableProps = {
  autosize: true,
  clearable: true,
  style: 'min-width: 300px; max-width: 100%',
} as const

export const TabSecurity = defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null)
    const user = useUser()
    const toast = useMessage()
    const router = useRouter()
    const resetPassword = reactive({
      password: '',
      reenteredPassword: '',
    })

    function validatePasswordSame(rule, value) {
      return value === resetPassword.password
    }
    const reset = async () => {
      if (!formRef.value) {
        return
      }

      formRef.value.validate(async (err) => {
        if (!err) {
          const res = await user.patchUserInfo({
            password: resetPassword.password,
          })
          if (res) {
            toast.success('修改成功')
            user.logout()
            router.push({ name: RouteName.Login })
          }
        } else {
          console.log(err)
        }
      })
    }

    return () => (
      <>
        <NForm
          class="max-w-[300px]"
          ref={formRef}
          model={resetPassword}
          rules={{
            password: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
            reenteredPassword: [
              {
                required: true,
                message: '请再次输入密码',
                trigger: ['input', 'blur'],
              },
              {
                validator: validatePasswordSame,
                message: '两次密码输入不一致',
                trigger: ['blur', 'password-input'],
              },
            ],
          }}
        >
          <NFormItem label="新密码" required path="password">
            <NInput
              {...autosizeableProps}
              value={resetPassword.password}
              onInput={(e) => void (resetPassword.password = e)}
              type="password"
            />
          </NFormItem>
          <NFormItem label="重复密码" required path="reenteredPassword">
            <NInput
              {...autosizeableProps}
              value={resetPassword.reenteredPassword}
              onInput={(e) => void (resetPassword.reenteredPassword = e)}
              type="password"
            />
          </NFormItem>
          <div class="w-full text-right">
            <NButton onClick={reset} type="primary" round>
              保存
            </NButton>
          </div>
        </NForm>
      </>
    )
  },
})
