import { RelativeTime } from '@/components/time/relative-time'
import {
  DataTableColumns,
  NButton,
  NDataTable,
  NPopconfirm,
  NSpace,
  useMessage,
} from 'naive-ui'
import { defineComponent, PropType, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DetailDataType, DetailReturnDataType } from '@/models/About'
import { deleteDetail, detailInfo } from '../../../api/modules/about'
import { RouteName } from '@/router/name'

export const DetailAboutView = defineComponent({
  props: {
    choiceRow: {
      type: Function as PropType<(ids: string[]) => void>,
      require: true,
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const toast = useMessage()
    const DetailData = ref<DetailReturnDataType | undefined>(undefined)
    const checkedRowKeysRef = ref<string[]>([])

    const handlePageChange = async (
      pageNum = (route.query.page || 1) as number,
      pageSize: number = 10,
    ) => {
      const res = (await detailInfo({
        pageNum,
        pageSize,
      })) as DetailReturnDataType
      if (res) {
        DetailData.value = res
      }
    }
    ctx.expose({ handlePageChange })

    watch(
      route,
      async () => {
        await handlePageChange()
      },
      { immediate: true },
    )

    const createColumns = (): DataTableColumns<DetailDataType> => {
      return [
        {
          type: 'selection',
        },
        {
          title: '标题',
          key: 'title',
          render(row) {
            return (
              <button
                class={'text-green-600'}
                onClick={() => {
                  router.push({
                    name: RouteName.EditAbout,
                    query: {
                      id: row.id,
                    },
                  })
                }}
              >
                {row.title}
              </button>
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
                    const res = await deleteDetail([row.id] as string[])
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
                      <span class="max-w-48">确定要删除 {row.title} ?</span>
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
      props.choiceRow?.(checkedRowKeysRef.value)
    }
    const columns = createColumns()
    return () => (
      <>
        <div>
          <NDataTable
            ref={'table'}
            columns={columns}
            remote
            data={DetailData.value?.aboutDetail}
            pagination={{
              page: DetailData.value?.pagination.page,
              pageSize: DetailData.value?.pagination.pageSize,
              pageCount: DetailData.value?.pagination.pageCount,
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
        </div>
      </>
    )
  },
})
