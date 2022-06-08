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
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(value?: Record<string, string>) => void>,
      required: true,
    },
  },
  setup(props, ctx) {
    const { onChange, value } = props
    const KVArray = ref<{ key: string; value: string }[]>([])

    onMounted(() => {

     Object.entries(props.value).forEach(([key, value]) => {
        KVArray.value.push({ key, value })
     })


    })

    watch(
      () => KVArray.value,
      (newValue) => {
        const obj = {}
        KVArray.value.map((item) => {
          if (item.key && item.value) {
            obj[item.key] = item.value
          }
        })
        onChange(obj)
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
                    options={props.options}
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
