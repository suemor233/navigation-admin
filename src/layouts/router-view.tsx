import { NSpin } from 'naive-ui'
import type { VNode } from 'vue'
import { Suspense, defineComponent } from 'vue'
import type { RouteLocation } from 'vue-router'
import { RouterView } from 'vue-router'

export const $RouterView = defineComponent({
  setup() {
    return () => (
      <RouterView>
        {{
          default({ Component }: { Component: VNode; route: RouteLocation }) {
            return (
              <Suspense>
                {{
                  default: () => Component,

                  fallback() {
                    return (
                      <div class="fixed left-1/2 top-1/2 transform text-primary-default -translate-y-1/2 -translate-x-1/2">
                        <NSpin strokeWidth={14} show rotate />
                      </div>
                    )
                  },
                }}
              </Suspense>
            )
          },
        }}
      </RouterView>
    )
  },
})
