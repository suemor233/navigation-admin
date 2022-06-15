import { aboutInfo, updateAbout } from '@/api/modules/about'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { CheckmarkSharp } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { BasicAboutView } from './basic'
import { DetailAboutView } from './detail'
export interface AboutType {
  id: string
  key: string
  value: string
  detailFlag: boolean
  created: string
}

export const AboutView = defineComponent({
  setup(props, ctx) {
    const toast = useMessage()
    const slots = {
      header: () => (
        <HeaderActionButton
          variant="primary"
          icon={<SendIcon />}
          onClick={async () => {
            const _concatValue: AboutType[] = []
            _concatValue.push(...updateAboutbasic, ...updateAboutDetail)
            const _res = await updateAbout(_concatValue)
            if (_res) {
              toast.success('修改成功')
            }
          }}
        ></HeaderActionButton>
        
      ),
    }

    const aboutValue = ref<AboutType[] | null>(null)

    let updateAboutbasic = reactive([] as AboutType[])
    let updateAboutDetail = reactive([] as AboutType[])

    onMounted(async () => {
      const res = await aboutInfo()
      aboutValue.value = res.data


      updateAboutbasic = aboutValue.value?.filter(
        (item) => item.detailFlag === false,
      ) as AboutType[]
      updateAboutDetail = aboutValue.value?.filter(
        (item) => item.detailFlag === true,
      ) as AboutType[]

    })

    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <div class={'flex flex-row w-full justify-around'}>
            <div>
              <p>基本信息</p>
              {aboutValue.value && (
                <BasicAboutView
                  aboutValue={updateAboutbasic}
                  onUpdateValue={(value) => {
                    updateAboutbasic = value
                  }}
                />
              )}
            </div>
            <div>
              <p>简要介绍</p>
              {aboutValue.value && (
                <DetailAboutView
                  aboutValue={updateAboutDetail}
                  onUpdateValue={(value) => {
                    updateAboutDetail = value
                  }}
                />
              )}
            </div>
          </div>
        </ContentLayout>
      </>
    )
  },
})
