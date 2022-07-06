import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NSpace, useMessage } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { analyzeInfo, charInfo, deleteAnalyzeAll } from '@/api/modules/analyze'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { RefreshOutlineIcon, TrashIcon } from '@/components/icons'
import { IpInfoPopover } from '@/components/ip-info'
import { XsSpan } from '@/components/span/xs-span'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { ContentLayout } from '@/layouts/content'
import type { AnalyzeType } from '@/models/Analyze'
import { parseDate } from '@/utils'
import { Line } from '@antv/g2plot'

const SectionTitle = defineComponent((_, { slots }) => () => (
  <div class="font-semibold text-gray-400 my-[12px] ">{slots.default?.()}</div>
))
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const toast = useMessage()
    const analyzeeData = ref<AnalyzeReturnDataType | undefined>(undefined)
    const checkedRowKeysRef = ref<string[]>([])
    const handlePageChange = async (
      pageNum = Number(route.query.page) || 1,
      pageSize = 30,
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
      await deleteAnalyzeAll().then((res) => {
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

    const Graph = defineComponent(() => {
      const dayChart = ref<HTMLElement>()
      const data = reactive<DayChartType[]>([])

      const fetchData = async () => {
        const res = (await charInfo()) as Record<'data', DayChartType[]>
        if (res) {
          Object.assign(data, res.data)
        }
        renderChart()
      }
      const renderChart = () => {
        const line = new Line(dayChart.value as HTMLElement, {
          data,
          xField: 'hour',
          yField: 'value',
          seriesField: 'key',
          height: 250,
          color: '#5AD8A6',
          point: {
            size: 3,
            shape: 'circle',
            style: {
              stroke: '#5AD8A6',
              lineWidth: 2,
              fillOpacity: 0.6,
            },
          },
          // 添加label
          label: {
            offsetY: -3,
            style: {
              fill: '#000',
            },
          },
        })
        line.render()
      }
      onMounted(async () => {
        await fetchData()
      })

      return () => (
        <div>
          <SectionTitle>今日请求走势</SectionTitle>
          <div ref={dayChart}></div>
        </div>
      )
    })

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
                    onClick={async () => {
                      await handlePageChange().then((res) => {
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
          <NSpace vertical size={30}>
            <Graph />
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
          </NSpace>
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

interface DayChartType {
  hour: string
  key: string
  value: number
}
