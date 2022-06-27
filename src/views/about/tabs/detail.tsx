import { RelativeTime } from '@/components/time/relative-time'
import { DataTableColumns, NDataTable } from 'naive-ui'
import { defineComponent, PropType, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DetailDataType, DetailReturnDataType } from '@/models/About'
import { detailInfo } from '../../../api/modules/about';

export const DetailAboutView = defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
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
        },
        {
          title: '内容',
          key: 'content',
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
                    name: 'edit',
                    query: {
                      id: row.id,
                    },
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
