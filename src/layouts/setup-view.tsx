import { defineComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    const bgUrl = import.meta.env.VITE_APP_LOGIN_BG as string
    const loaded = ref(false)
    onMounted(() => {
      const $$ = new Image()
      $$.src = bgUrl
      $$.onload = (e) => {
        loaded.value = true
      }
    })

    return () => (
      <>
        <div>
          <div
            class={
              'fixed top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat -m-4 bg-gray-600 ease-linear transition-opacity duration-700 filter blur-sm'
            }
            style={{
              backgroundImage: `url(${bgUrl})`,
              opacity: loaded.value ? 1 : 0.4,
            }}
          ></div>
          <RouterView />
        </div>
      </>
    )
  },
})
