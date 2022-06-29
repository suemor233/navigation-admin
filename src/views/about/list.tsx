import { deleteDetail } from '@/api/modules/about'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { AddIcon } from '@/components/icons'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { ContentLayout } from '@/layouts/content'
import { DetailReturnDataType } from '@/models/About'
import { NCollapse, NCollapseItem, NSpace, useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { BasicAboutView } from './tabs/basic'
import { DetailAboutView } from './tabs/detail'

export default defineComponent({
  setup(props, ctx) {
    const checkedRowKeysRef = ref<string[]>([])
    const detaioRef = ref<{handlePageChange:(pageNum?:number,pageSize?:number)=>void}>()
    const slots = {
      _header: () => (
        <>
          <NSpace>
            <DeleteConfirmButton
              checkedRowKeys={checkedRowKeysRef.value}
              onDelete={async () => {
                await deleteDetail(checkedRowKeysRef.value)
                detaioRef.value?.handlePageChange()
              }}
            />
            <HeaderActionButton to={'/about/edit'} icon={<AddIcon />} />
          </NSpace>
        </>
      ),
      get header() {
        return this._header
      },
      set header(value) {
        this._header = value
      },
    }

    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <NCollapse defaultExpandedNames={['detail']} displayDirective="show">
            <NCollapseItem title="简要介绍" name="detail">
              <DetailAboutView
                ref={detaioRef}
                choiceRow={(ids: string[]) => {
                  checkedRowKeysRef.value = ids
                }}
              />
            </NCollapseItem>
            <NCollapseItem title="基本信息" name="basic">
              <BasicAboutView />
            </NCollapseItem>
          </NCollapse>
        </ContentLayout>
      </>
    )
  },
})
