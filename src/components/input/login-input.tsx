import { NButton } from 'naive-ui'
import { defineComponent, PropType } from 'vue'
import { LoginInputIcon } from '../icons'
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
    } ,
    onClick: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  setup(props, ctx) {
    return () => (
      <>
        <div class={styles['input-wrap']}>
          <input
            type="password"
            autofocus
            placeholder="输入密码"
            value={props.value}
            onInput={(e) => props.onChange?.((e.target as any).value)}
            onKeyup={(e) => e.key === 'Enter' && props.onClick?.()}
          />
          {!props.disabled && (
            <div class="absolute right-0 mt-0.5 mr-0.5">
              <button onClick={props.onClick}>
                <LoginInputIcon />
              </button>
            </div>
          )}
        </div>
      </>
    )
  },
})
