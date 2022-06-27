import { BasicDataType } from '@/models/About'
import { NDynamicInput } from 'naive-ui'
import { defineComponent, PropType, ref, watch } from 'vue'


export const BasicAboutView = defineComponent({
  props: {
    aboutValue: {
      type: Object as PropType<BasicDataType[]>,
      required: true,
    },
    onUpdateValue: {
      type: Function as PropType<(value: BasicDataType[]) => void>,
      required: true,
    },
  },
  setup(props, ctx) {
    const basicValue = ref<BasicDataType[]>(props.aboutValue)

    watch(basicValue, (newValue) => {
      props.onUpdateValue && props.onUpdateValue(newValue)
    })

    return () => (
      <>
        <div class={'mt-2'}>
          <NDynamicInput
            v-model:value={basicValue.value}
            preset={'pair'}
            keyPlaceholder={'基本信息名称'}
            valuePlaceholder={'基本信息值'}
          />
        </div>
      </>
    )
  },
})
