import { RelativeTime } from '@/components/time/relative-time'
import { DataTableColumns, NDataTable, useMessage } from 'naive-ui'
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
        console.log(DetailData.value);
      }
    }
    ctx.expose({handlePageChange})

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
                    name: RouteName.EditAbout,
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
