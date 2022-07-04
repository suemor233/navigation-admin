import 'vditor/dist/index.css'
import './vditor.css'

import Vditor from 'vditor'
import type { PropType } from 'vue'

export const MyVditor = defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function as PropType<(val: string) => void>,
      required: false,
    },
  },
  setup(props) {
    const vditor = ref<Vditor | null>(null)
    const vRef = ref()
    onMounted(() => {
      vditor.value = new Vditor(vRef.value, {
        value: props.text,
        height: '85vh',
        toolbar: [],
        preview: {
          hljs: {
            lineNumber: true,
          },
        },
        theme: 'classic',
        cache: {
          enable: false,
        },
        toolbarConfig: {
          hide: true,
        },
        input(val: string) {
          props.onChange?.(val.trim())
        },
      })
    })
    return () => (
      <>
        <div ref={vRef} />
      </>
    )
  },
})
