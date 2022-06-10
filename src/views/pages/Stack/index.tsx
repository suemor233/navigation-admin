import { ContentLayout } from '@/layouts/content'
import { defineComponent } from 'vue'
export const StackView = defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <ContentLayout>
          <h1>Stack</h1>
        </ContentLayout>
      </>
    )
  },
})
