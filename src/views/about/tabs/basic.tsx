import { NDynamicInput } from 'naive-ui'
import { defineComponent, PropType, ref, watch } from 'vue'
import { AboutType } from '../list'

export const BasicAboutView = defineComponent({
  name: 'BasicAboutView',
  props: {
    aboutValue: {
      type: Object as PropType<AboutType[]>,
      required: true,
    },
    onUpdateValue: {
      type: Function as PropType<(value: AboutType[]) => void>,
      required: true,
    },
  },
  setup(props, ctx) {
    const basicValue = ref<AboutType[]>(props.aboutValue)

    watch(basicValue, (newValue) => {
      newValue.forEach((item) => {
        item.detailFlag = false
      })
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
