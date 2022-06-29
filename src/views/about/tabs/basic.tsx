import { basicInfo, updateBasic } from '@/api/modules/about'
import { BasicDataType } from '@/models/About'
import { NButton, NDynamicInput, NSpace, useMessage } from 'naive-ui'

export const BasicAboutView = defineComponent({
  setup(props, ctx) {
    const basicValue = ref<BasicDataType[]>()
    const toast = useMessage()
    onMounted(async () => {
      const res = await basicInfo()
      if (res) {
        basicValue.value = res.data
      }
    })

    const handleSave = async () => {
      if (basicValue.value) {
        const res = await updateBasic(basicValue.value)
        res && toast.success('保存成功')
      }
    }

    return () => (
      <>
        <NSpace vertical size={'large'}>
          <NDynamicInput
            v-model:value={basicValue.value}
            preset={'pair'}
            keyPlaceholder={'基本信息名称'}
            valuePlaceholder={'基本信息值'}
          />
            <NButton type="primary" onClick={handleSave}>
              保存
            </NButton>
        </NSpace>
      </>
    )
  },
})
