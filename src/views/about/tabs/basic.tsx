import { basicInfo, updateBasic } from '@/api/modules/about'
import { BasicDataType } from '@/models/About'
import { deepDiff } from '@/utils'
import { NButton, NDynamicInput, NSpace, useMessage } from 'naive-ui'
import { isEmpty } from 'lodash-es'
export const BasicAboutView = defineComponent({
  setup(props, ctx) {
    const basicValue = ref<BasicDataType[]>([])
    let origin: BasicDataType[]
    const toast = useMessage()

    onMounted(async () => {
      handleChange()
    })
    const diff = computed(() =>
      deepDiff( {...[origin]}, {...[basicValue.value]}),
    )
    const handleSave = async () => {

      if (basicValue.value) {
        const res = await updateBasic(basicValue.value)
        res && toast.success('保存成功')
        handleChange()
      }
    }

    const handleChange = async () => {
      const res = (await basicInfo()) as { data: BasicDataType[] }
      if (res) {
        basicValue.value = []
        res.data.forEach((item) => {
          basicValue.value?.push({ key: item.key, value: item.value })
        })
        origin = basicValue.value
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
          <NButton
            type="primary"
            disabled={isEmpty(diff.value)}
            onClick={handleSave}
          >
            保存
          </NButton>
        </NSpace>
      </>
    )
  },
})
