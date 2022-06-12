import { SEditor } from '@/components/SEditor';
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
               <SEditor
                // options={Object.keys(socialKeyMap).map((key) => {
                //   return {
                //     label: key,
                //     value: socialKeyMap[key],
                //   }
                // })}
                // value={settingForm.socialIds as Record<string, string>}
                // onChange={(newValue) => {
                //   settingForm.socialIds = newValue
                // }}
               />
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