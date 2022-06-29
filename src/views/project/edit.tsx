import { createProject, projectInfoById, updateProject } from '@/api/modules/project'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { router } from '@/router'
import { RouteName } from '@/router/name'
import { CheckmarkSharp } from '@vicons/ionicons5'
import { NDynamicTags, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

export interface ProjectDataType {
  id?: string
  name: string
  url?: string
  img: string
  created?: string
  modified?: string
}

export default defineComponent({
  setup(props, ctx) {
    const toast = useMessage()
    const route = useRoute()
    const slots = {
      header: () => (
        <HeaderActionButton
          variant="primary"
          icon={<SendIcon />}
          onClick={handleSubmit}
        ></HeaderActionButton>
      ),
      title: route.query.id ? '项目 · 修改项目' : null,
    }

    const handleSubmit = async () => {
      if (!projectData.url) {
        projectData.url = undefined
      }

      let res
      if (route.query.id) {
        res = await updateProject(route.query.id as string,projectData)
      } else {
        res = await createProject(projectData)
      }
      if (res) {
        toast.success(route.query.id ? '修改成功' :'创建成功')
        router.push({
          name: RouteName.ListProject,
          query: {
            page: 1,
          },
        })
      }
    }

    const projectData = reactive<ProjectDataType>({
      name: '',
      url: '',
      img: '',
    })

    onMounted(async () => {
      if (route.query.id) {
        const res = await projectInfoById(route.query.id as string)
        res && Object.assign(projectData, res)
      }
    })


    watch(
      () => route.query.id,
      (id) => {
        route.name === RouteName.EditProject && !id && location.reload()
      },
    )

    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NForm labelWidth="6rem" labelPlacement="left" labelAlign="left">
            <NFormItem label="项目名称" required>
              <NInput
                autofocus
                placeholder=""
                v-model:value={projectData.name}
              ></NInput>
            </NFormItem>

            <NFormItem label="项目地址">
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
