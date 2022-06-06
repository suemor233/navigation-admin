import { ContentLayout } from '@/layouts/content'
import { defineComponent } from 'vue'
export const DashBoardView = defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <ContentLayout>
          <h1>dashboard</h1>
        </ContentLayout>
      </>
    )
  },
})
