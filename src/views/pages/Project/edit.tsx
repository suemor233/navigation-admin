import { createProject } from '@/api/modules/project'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { router } from '@/router'
import { RouteName } from '@/router/name'
import { CheckmarkSharp } from '@vicons/ionicons5'
import { NDynamicTags, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { defineComponent, reactive } from 'vue'

export interface ProjectDataType {
  id?:string
  name: string
  url?: any
  img: string
  created?:string
}

export default defineComponent({
  setup(props, ctx) {
    const toast = useMessage()
    const slots = {
      header: () => (
        <HeaderActionButton
          variant="primary"
          icon={<SendIcon />}
          onClick={handleSubmit}
        ></HeaderActionButton>
      ),
    }

    const handleSubmit = async() => {
      if(!projectData.url ){
        projectData.url = undefined
      }
       
        const res = await createProject(projectData)
        if (res) {
          toast.success('创建成功')
          router.push({
            name:RouteName.ListProject,
            query:{
              page:1
            }
          })
        }
    }

    const projectData = reactive<ProjectDataType >({
      name:'',
      url:'',
      img:''
    })

    
    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NForm labelWidth="6rem" labelPlacement="left" labelAlign="left">
            <NFormItem label="项目名称" required>
              <NInput autofocus placeholder="" v-model:value={projectData.name}></NInput>
            </NFormItem>

            <NFormItem label="项目地址" >
              <NInput placeholder="" v-model:value={projectData.url}></NInput>
            </NFormItem>

            <NFormItem label="图片地址" required>
              <NInput placeholder="" v-model:value={projectData.img}></NInput>
            </NFormItem>
          </NForm>
        </ContentLayout>
      </>
    )
  },
})
