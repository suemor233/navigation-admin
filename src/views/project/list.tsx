import { deleteProject, projectInfo } from '@/api/modules/project'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { AddIcon } from '@/components/icons'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { RelativeTime } from '@/components/time/relative-time'
import { ContentLayout } from '@/layouts/content'
import { DataTableColumns, NButton, NDataTable, NSpace } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProjectDataType } from './edit'
import { RouteName } from '@/router/name';

interface ProjectReturnDataType {
  project: ProjectDataType[]
  pagination: {
    pageCount: number
    page: number
    pageSize: number
    itemCount: number
  }
}

export default defineComponent({
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const slots = {
      header: () => (
        <>
          <NSpace>
            <DeleteConfirmButton
              checkedRowKeys={checkedRowKeysRef.value}
              onDelete={async () => {
                await deleteProject(checkedRowKeysRef.value)
                await handlePageChange()
              }}
            />
            <HeaderActionButton to={'/projects/edit'} icon={<AddIcon />} />
          </NSpace>
        </>
      )
    }

    const handlePageChange = async (
      pageNum = (route.query.page || 1) as number,
      pageSize: number = 10,
    ) => {
      const res = (await projectInfo({
        pageNum,
        pageSize,
      })) as ProjectReturnDataType
      if (res) {
        projectData.value = res
      }
    }

    const projectData = ref<ProjectReturnDataType | undefined>(undefined)
    const checkedRowKeysRef = ref<string[]>([])

    watch(
      route,
      async () => {
        await handlePageChange()

      },
      { immediate: true },
    )

    const createColumns = (): DataTableColumns<ProjectDataType> => {
      return [
        {
          type: 'selection',
        },
        {
          title: '名称',
          key: 'name',
        },
        {
          title: '项目地址',
          key: 'url',
          render(row) {
            return (
              <a href={row.url} class="text-green-600" target="_blank">
                {row.url}
              </a>
            )
          },
        },
        {
          title: '项目图片',
          key: 'img',
          render(row) {
            return (
              <a href={row.img} class="text-green-600" target="_blank">
                {row.img}
              </a>
            )
          },
        },
        {
          title: '创建日期',
          key: 'created',
          render(row) {
            return <RelativeTime time={row.created as string}></RelativeTime>
          },
        },
        {
          title: '编辑',
          key: 'update',
          render(row) {
            return (
              <button
                class={'text-green-600'}
                onClick={() => {
                  router.push({
                    name:RouteName.EditProject,
                    query:{
                      id:row.id
                    }
                  })
                }}
              >
                编辑
              </button>
            )
          },
        },
      ]
    }
    const handleCheck = (rowKeys: any) => {
      checkedRowKeysRef.value = rowKeys
    }

    const columns = createColumns()
    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NDataTable
            ref={'table'}
            columns={columns}
            remote
            data={projectData.value?.project}
            pagination={{
              page: projectData.value?.pagination.page,
              pageSize: projectData.value?.pagination.pageSize,
              pageCount: projectData.value?.pagination.pageCount,
              onChange: async (page) => {
                router.push({
                  query: { ...route.query, page },
                  path: route.path,
                })
              },
            }}
            rowKey={(row) => row.id}
            onUpdateCheckedRowKeys={handleCheck}
          />
        </ContentLayout>
      </>
    )
  },
})
