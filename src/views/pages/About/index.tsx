import { ContentLayout } from '@/layouts/content';
import { defineComponent } from 'vue'
export const AboutView =  defineComponent({
  setup(props, ctx) {
  return () => (
      <>
      <ContentLayout>
           <div class={'flex flex-row w-full justify-around'}>
             <div>
               <p>基本信息</p>
             </div>

             <div>
               <p>简要介绍</p>
             </div>
           </div>
      </ContentLayout>
      </>
    );
  }
})