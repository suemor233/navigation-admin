import { RelativeTime } from '@/components/time/relative-time'
import { ContentLayout } from '@/layouts/content'
import { useUser } from '@/store/user'
import { IUser } from '@/store/user/userType'
import { deepDiff } from '@/utils'
import {
  FormInst,
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from 'naive-ui'
import Avatar from 'naive-ui/es/avatar/src/Avatar'
import { storeToRefs } from 'pinia'
import { isEmpty } from 'lodash-es'
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue'

export interface SettingFormType
  extends Partial<Pick<IUser, 'username' | 'mail' | 'avatar' | 'introduce'>> {}

export default defineComponent({
  setup(props, ctx) {
    const { user } = storeToRefs(useUser())
    const { updateUserInfo,patchUserInfo } = useUser()
    const formRef = ref<FormInst | null>(null)
    const toast = useMessage()
    const settingForm = reactive<SettingFormType>({
      username: '',
      mail: '',
      avatar: '',
      introduce: '',
    })
    const diff = computed(() => deepDiff(user.value as IUser, settingForm))

    onBeforeMount(async () => {
      await updateUserInfo()
      Object.assign(settingForm, user.value)
    })
    const rules: FormRules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      mail: [
        {
          required: true,
          message: '请输入主人邮箱',
        },
      ],

      avatar: [
        {
          required: true,
          message: '请输入主人头像地址',
        },
      ],
      introduce: [
        {
          required: true,
          message: '请输入个人介绍',
        },
      ],
    }

    const handleSave = (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate(async (errors) => {
        if (errors) {
          return
        }
        const res = await patchUserInfo(settingForm)
        res && toast.success('修改成功')
      })
    }

    return () => (
      <>
        <ContentLayout>
          <div class={'flex justify-center items-center flex-row'}>
            <div>
              <div
                class={'bg-transparent border-gray-200 border-8 rounded-full'}
              >
                <Avatar round src={settingForm.avatar} size={200}></Avatar>
              </div>
              <div class={'text-center'}>
                <div class={'mt-8'}>
                  <p>上次登录时间</p>
                  <p class={'mt-3'}>
                    {user.value?.lastLoginTime ? (
                      <RelativeTime
                        time={user.value?.lastLoginTime}
                      ></RelativeTime>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>

                <div class={'mt-8'}>
                  <p>上次登录地址</p>
                  <p class={'mt-3'}>{user.value?.lastLoginIp}</p>
                </div>
                <div class={'mt-7'}>
                  <NButton
                    onClick={handleSave}
                    type="primary"
                    round
                    disabled={isEmpty(diff.value)}
                  >
                    保存
                  </NButton>
                </div>
              </div>
            </div>
            <div class={'ml-24 w-96'}>
              <NForm ref={formRef} model={settingForm} rules={rules}>
                <NFormItem path="username" label="主人名 (username)">
                  <NInput
                    v-model:value={settingForm.username}
                    placeholder={'请输入主人名'}
                  />
                </NFormItem>
                <NFormItem path="mail" label="主人邮箱 (mail)">
                  <NInput
                    v-model:value={settingForm.mail}
                    placeholder={'请输入主人邮箱'}
                  />
                </NFormItem>

                <NFormItem path="avatar" label="头像">
                  <NInput
                    v-model:value={settingForm.avatar}
                    placeholder={'请输入主人头像地址'}
                  />
                </NFormItem>

                <NFormItem path="introduce" label="个人介绍">
                  <NInput
                    v-model:value={settingForm.introduce}
                    type="textarea"
                    resizable={false}
                    placeholder={'请输入个人介绍'}
                  />
                </NFormItem>
              </NForm>
            </div>
          </div>
        </ContentLayout>
      </>
    )
  },
})
