import { deleteProject, projectInfo } from '@/api/modules/project'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { AddIcon } from '@/components/icons'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { RelativeTime } from '@/components/time/relative-time'
import { ContentLayout } from '@/layouts/content'
import {
  DataTableColumns,
  NButton,
  NDataTable,
  NPopconfirm,
  NSpace,
  useMessage,
} from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProjectDataType } from './edit'
import { RouteName } from '@/router/name'

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
    const toast = useMessage()
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
      ),
    }

    const handlePageChange = async (
      pageNum = Number(route.query.page) || 1,
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
          render(row) {
            return (
              <button
                class={'text-green-600'}
                onClick={() => {
                  router.push({
                    name: RouteName.EditProject,
                    query: {
                      id: row.id,
                    },
                  })
                }}
              >
                {row.name}
              </button>
            )
          },
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
          title: '修改日期',
          key: 'modified',
          render(row) {
            return <RelativeTime time={row.modified as string}></RelativeTime>
          },
        },
        {
          title: '操作',
          key: 'update',
          render(row) {
            return (
              <NSpace>
                <NPopconfirm
                  positiveText={'取消'}
                  negativeText="删除"
                  onNegativeClick={async () => {
                    const res = await deleteProject([row.id] as string[])
                    if (res) {
                      toast.success('删除成功')
                      await handlePageChange()
                    }
                  }}
                >
                  {{
                    trigger: () => (
                      <NButton text type="error" size="tiny">
                        移除
                      </NButton>
                    ),

                    default: () => (
                      <span class="max-w-48">确定要删除 {row.name} ?</span>
                    ),
                  }}
                </NPopconfirm>
              </NSpace>
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
