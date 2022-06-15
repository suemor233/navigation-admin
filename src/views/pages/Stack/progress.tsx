import { StackType } from '@/models/StackType'
import { NDynamicInput, NInput, NSlider, NSpace } from 'naive-ui'
import { defineComponent, PropType, ref, watch } from 'vue'
export const ProgressView = defineComponent({
  props: {
    stackValue: {
      type: Object as PropType<StackType[]>,
      required: true,
    },
    onUpdateValue: {
      type: Function as PropType<(value: StackType[]) => void>,
      required: true,
    },
  },
  setup(props, ctx) {
    const basicValue = ref<StackType[]>(props.stackValue)

    watch(basicValue, (newValue) => {
      // console.log(newValue);
      props.onUpdateValue && props.onUpdateValue(basicValue.value)
    })

    const onCreate = () => {
      return {
        name: '',
        progressValue: '',
      }
    }

    return () => (
      <>
        <div class={'mt-2'}>
          <NDynamicInput v-model:value={basicValue.value} onCreate={onCreate}>
            {{
              default(rowProps) {
                return (
                  <div class={'w-full flex justify-around items-center gap-x-4'}>
                    <div
                      class={'flex justify-around items-center w-full gap-x-8'}
                    >
                      <NInput v-model:value={rowProps.value.name} />
                      <NSlider v-model:value={rowProps.value.progressValue} step={5}/>
                    </div>
                    <p class={'w-5'}>{rowProps.value.progressValue}</p>
                  </div>
                )
              },
            }}
          </NDynamicInput>
        </div>
      </>
    )
  },
})
