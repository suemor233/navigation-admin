import { defineComponent } from 'vue'
import { ContentLayout } from '@/layouts/content';
export default defineComponent({
  setup(props, ctx) {
  return () => (
      <>
          <ContentLayout>
            <h1>edit</h1>
          </ContentLayout>
      </>
    );
  }
})