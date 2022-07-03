import { defineComponent } from 'vue'
import { ContentLayout } from '@/layouts/content'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { RefreshOutlineIcon, TrashIcon } from '@/components/icons'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { DataTableColumns, NButton, NDataTable, NSpace, useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { AnalyzeType } from '@/models/Analyze'
import { analyzeInfo, deleteAnalyzeAll } from '@/api/modules/analyze'
import { XsSpan } from '@/components/span/xs-span'
import { parseDate } from '@/utils'
import { IpInfoPopover } from '@/components/ip-info'

export default defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const toast = useMessage()
    const analyzeeData = ref<AnalyzeReturnDataType | undefined>(undefined)
    const checkedRowKeysRef = ref<string[]>([])

    const handlePageChange = async (
      pageNum = Number(route.query.page) || 1,
      pageSize: number = 30,
    ) => {
      const res = (await analyzeInfo({
        pageNum,
        pageSize,
      })) as AnalyzeReturnDataType
      if (res) {
        analyzeeData.value = res
        return true
      }
      return false
    }

    const clearAllData = async () => {
      await deleteAnalyzeAll().then(res =>{
        console.log(res);
        res && toast.success('清空成功')
        handlePageChange()
      })
    }

    const createColumns = (): DataTableColumns<AnalyzeType> => {
      return [
        {
          title: '时间',
          key: 'created',
          render(row) {
            return (
              <time>{parseDate(row.created, 'yyyy年M月d日 HH:mm:ss')}</time>
            )
          },
        },
        {
          title: 'IP',
          key: 'ip',
          render(row) {
            return (
              <IpInfoPopover
                ip={row.ip}
                triggerEl={
                  <NButton text size="tiny" type="primary">
                    {row.ip}
                  </NButton>
                }
              ></IpInfoPopover>
            )
          },
        },
        {
          title: '请求路径',
          key: 'path',
          render(row) {
            return <XsSpan value={row.path} />
          },
        },
        {
          title: '浏览器',
          key: 'browser',
          render(row) {
            return <XsSpan value={row.browser} />
          },
        },
        {
          title: 'OS',
          key: 'os',
          render(row) {
            return <XsSpan value={row.os} />
          },
        },
        {
          title: 'User Agent',
          key: 'ua',
          render(row) {
            return <XsSpan value={row.ua} />
          },
        },
      ]
    }

    const handleCheck = (rowKeys: any) => {
      checkedRowKeysRef.value = rowKeys
    }

    watch(
      route,
      async () => {
        await handlePageChange()
      },
      { immediate: true },
    )
    const columns = createColumns()
    return () => (
      <>
        <ContentLayout
          v-slots={{
            header: () => (
              <>
                <NSpace>
                  <HeaderActionButton
                    icon={<RefreshOutlineIcon />}
                    variant="success"
                    name="刷新数据"
                    onClick={async() => {
                      await handlePageChange().then((res)=>{
                        res && toast.success('刷新成功')
                      })
                    }}
                  ></HeaderActionButton>
                  <DeleteConfirmButton
                    onDelete={async () => {
                      await clearAllData()
                    }}
                    customSuccessMessage="已清空"
                    message="你确定要清空数据表？"
                    customButtonTip="清空表"
                    customIcon={<TrashIcon />}
                  />
                </NSpace>
              </>
            ),
          }}
          responsive={false}
        >
          <NDataTable
            ref={'table'}
            columns={columns}
            remote
            data={analyzeeData.value?.analyzes}
            pagination={{
              page: analyzeeData.value?.pagination.page,
              pageSize: analyzeeData.value?.pagination.pageSize,
              pageCount: analyzeeData.value?.pagination.pageCount,
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

interface AnalyzeReturnDataType {
  analyzes: AnalyzeType[]
  pagination: {
    pageCount: number
    page: number
    pageSize: number
    itemCount: number
  }
}
