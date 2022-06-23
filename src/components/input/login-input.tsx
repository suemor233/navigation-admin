import { Icon } from '@vicons/utils'
import { NButton } from 'naive-ui'
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import ArrowCircleRight28Regular from '@vicons/fluent/es/ArrowCircleRight28Regular'
import styles from './index.module.scss'
export const LoginInput = defineComponent({
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    value: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      required: true,
    },
    onClick: {
      type: Function as PropType<() => void>,
      required: false,
    },
    shake: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, ctx) {
    const waitResponse = ref(false)
    watch(props, () => {
      waitResponse.value = props.shake
    })
    const handleSend = () => {
      if (!waitResponse.value) {
        waitResponse.value = true
        props.onClick?.()
      }

    }
    return () => (
      <>
        <div
          class={[styles['input-wrap'], props.shake && styles['shake-input']]}
        >
          <input
            type="password"
            autofocus
            autocomplete="new-password"
            placeholder="输入密码"
            value={props.value}
            onInput={(e) => {
              props.onChange?.((e.target as any).value)
            }}
            onKeyup={(e) => e.key === 'Enter' && handleSend()}
          />

          {!props.disabled && (
            <div class="absolute right-0 mt-0.5 mr-0.5">
              <button onClick={handleSend} style={waitResponse.value ? {pointerEvents:'none'} : ''}>
                <Icon
                  color={waitResponse.value ? '#c3c0c2' : 'white'}
                  size={25}
                >
                  <ArrowCircleRight28Regular />
                </Icon>
              </button>
            </div>
          )}
        </div>
      </>
    )
  },
})
