import { ContentLayout } from '@/layouts/content'
import { defineComponent } from 'vue'
export const ProjectView = defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <ContentLayout>
          <h1>Project</h1>
        </ContentLayout>
      </>
    )
  },
})
