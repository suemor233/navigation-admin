import { RelativeTime } from '@/components/time/relative-time'
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
import { storeToRefs } from 'pinia'
import { isEmpty } from 'lodash-es'
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue'
import { SEditor } from '@/components/v-editor'
import { socialKeyMap } from '@/common/social'
import Avatar from '@/components/avatar'

export interface SettingFormType
  extends Partial<
    Pick<
      IUser,
      | 'username'
      | 'mail'
      | 'avatar'
      | 'introduce'
      | 'socialIds'
      | 'backgroundImage'
      | 'password'
    >
  > {}

export const TabUser = defineComponent({
  setup(props, ctx) {
    const { user } = storeToRefs(useUser())
    const { updateUserInfo, patchUserInfo } = useUser()
    const formRef = ref<FormInst | null>(null)
    const toast = useMessage()
    const settingForm = reactive<SettingFormType>({
      username: '',
      mail: '',
      avatar: '',
      introduce: '',
      backgroundImage: '',
      socialIds: undefined,
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
      backgroundImage: [
        {
          required: true,
          message: '请输入主人北京图片地址',
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
        <div class={'flex justify-center flex-row '}>
          <div>
            <div
              class={
                'bg-transparent border-gray-200 border-8 rounded-full justify-center flex items-center'
              }
            >
              <Avatar src={settingForm.avatar} size={200}></Avatar>
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

              <NFormItem path="backgroundImage" label="背景图片">
                <NInput
                  v-model:value={settingForm.backgroundImage}
                  placeholder={'请输入主人背景图片地址'}
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

              {settingForm.socialIds ? (
                <NFormItem label="社交平台地址录入">
                  <SEditor
                    options={Object.keys(socialKeyMap).map((key) => {
                      return {
                        label: key,
                        value: socialKeyMap[key],
                      }
                    })}
                    value={settingForm.socialIds as Record<string, string>[]}
                    onChange={(newValue) => {
                      settingForm.socialIds = newValue
                    }}
                  />
                </NFormItem>
              ) : null}
            </NForm>
          </div>
        </div>
      </>
    )
  },
})
