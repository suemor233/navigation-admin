import { aboutInfo, updateAbout } from '@/api/modules/about'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { CheckmarkSharp } from '@vicons/ionicons5'
import { NCollapse, NCollapseItem, NDynamicInput, useMessage } from 'naive-ui'
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { BasicAboutView } from './tabs/basic'
import { DetailAboutView } from './tabs/detail'

export interface AboutType {
  id: string
  key: string
  value: string
  detailFlag: boolean
  created: string
}

export default defineComponent({
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
          <NCollapse defaultExpandedNames={['detail']} displayDirective="show">
            <NCollapseItem title="简要介绍" name="detail">
              {aboutValue.value && (
                <DetailAboutView
                  aboutValue={updateAboutDetail}
                  onUpdateValue={(value) => {
                    updateAboutDetail = value
                  }}
                />
              )}
            </NCollapseItem>
            <NCollapseItem title="基本信息" name="basic">
              {aboutValue.value && (
                <BasicAboutView
                  aboutValue={updateAboutbasic}
                  onUpdateValue={(value) => {
                    updateAboutbasic = value
                  }}
                />
              )}
            </NCollapseItem>
          </NCollapse>
        </ContentLayout>
      </>
    )
  },
})
