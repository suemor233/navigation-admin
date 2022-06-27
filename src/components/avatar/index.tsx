import { defineComponent, onMounted, ref, watch } from 'vue'
import styles from './index.module.scss'
export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 50,
    },
    src: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const loaded = ref(false)

    const preloadImage = () => {
      if (!props.src) {
        return
      }
      const $$ = new Image()
      $$.src = props.src

      $$.onload = (e) => {
        loaded.value = true
      }
    }
    onMounted(() => {
      preloadImage()
    })

    watch(
      () => props.src,
      () => {
        preloadImage()
      },
    )

    return () => (
      <>
        <div
          class={styles.avatar}
          style={{ height: `${props.size}px`, width: `${props.size}px` }}
        >
          <img
            src={props.src}
            alt=""
            style={{ display: loaded ? '' : 'none' }}
          />
          <div class="sr-only">一个头像</div>
        </div>
      </>
    )
  },
})
