import type { Stack } from '@/models/Stack'
import { NDynamicInput, NInput, NSlider } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'


export const ProgressView = defineComponent({
  props: {
    stackValue: {
      type: Object as PropType<Stack[]>,
      required: true,
    },
    onUpdateValue: {
      type: Function as PropType<(value: Stack[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const basicValue = ref<Stack[]>(props.stackValue)

    watch(
      basicValue,
      (newValue) => {
        props.onUpdateValue && props.onUpdateValue(basicValue.value)
      },
      { deep: true },
    )

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
                  <div
                    class={'w-full flex justify-around items-center gap-x-4'}
                  >
                    <div
                      class={'flex justify-around items-center w-full gap-x-8'}
                    >
                      <NInput v-model:value={rowProps.value.name} />
                      <NSlider
                        v-model:value={rowProps.value.progressValue}
                        step={5}
                      />
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
