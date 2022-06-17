import { nextTick, onMounted } from 'vue'
import { NButton, NDynamicInput, NInput, NSelect } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { defineComponent, onBeforeMount, PropType, ref, watch } from 'vue'
export const SEditor = defineComponent({
  props: {
    options: {
      type: Object as PropType<SelectMixedOption[]>,
      required: true,
    },
    value: {
      type: Object as PropType<Record<string, string>[]>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(value?: Record<string, string>[]) => void>,
      required: true
    },
  },
  setup(props, ctx) {
    const { onChange, value } = props
    const KVArray = ref<{ key: string; value: string }[]>(value as { key: string; value: string }[])
    const options = ref(props.options)

    watch(
      () => KVArray.value,
      (newValue) => {
        //@ts-ignore
        onChange(newValue)

        options.value?.forEach((option) => {
          option.disabled = !!KVArray.value.find((item) => item.key === option.value)
        })
      },
      { deep: true },
    )

    const onCreate = () => {
      return {
        key: '',
        value: '',
      }
    }
    return () => (
      <>
        <NDynamicInput v-model:value={KVArray.value} onCreate={onCreate}>
          {{
            default(rowProps) {
              return (
                <div class="flex items-center w-full">
                  <NSelect
                    class="mr-4"
                    filterable
                    tag
                    placeholder="请选择"
                    value={rowProps.value.key}
                    onUpdateValue={(platform) => {
                      rowProps.value.key = platform
                    }}
                    options={options.value}
                  ></NSelect>
                  <NInput v-model:value={rowProps.value.value}></NInput>
                </div>
              )
            },
          }}
        </NDynamicInput>
      </>
    )
  },
})
