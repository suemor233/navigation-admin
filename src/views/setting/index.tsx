import { ContentLayout } from '@/layouts/content';
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props, ctx) {
  return () => (
      <>
        <ContentLayout>
            <div class={''}>

            </div>
        </ContentLayout>
      </>
    );
  }
})