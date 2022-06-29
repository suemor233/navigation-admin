import { defineComponent, onMounted, ref } from 'vue'

import { inputBaseProps } from './base'
import styles from './material.module.scss'

export const MaterialInput = defineComponent({
  props: {
    ...inputBaseProps,
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['compositionend', 'compositionstart'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>()

    onMounted(() => {
      if (!inputRef.value) {
        return
      }
      inputRef.value.addEventListener('compositionstart', () => {
        emit('compositionstart')
      })

      inputRef.value.addEventListener('compositionend', () => {
        emit('compositionend')
      })
    })

    return () => (
      <div class={[styles['root'], styles['group']]}>
        <input
          required
          ref={inputRef}
          type={props.type ?? 'text'}
          value={props.value}
          onInput={(e) => props.onChange((e.target as any).value)}
        />
        <span class={styles['bar']}></span>
        <label>{props.label}</label>
      </div>
    )
  },
})
