import { HeaderActionButton } from '@/components/button/rounded-button'
import { AddIcon } from '@/components/icons'
import { DeleteConfirmButton } from '@/components/special-button/delete-confirm'
import { ContentLayout } from '@/layouts/content'
import {
  NCollapse,
  NCollapseItem,
  NSpace,
  useMessage,
} from 'naive-ui'
import { defineComponent,  ref } from 'vue'
import { DetailAboutView } from './tabs/detail'



export default defineComponent({
  setup(props, ctx) {
    const toast = useMessage()

    const checkedRowKeysRef = ref<string[]>([])
    const slots = {
      _header: () => (
        <>
          <NSpace>
            <DeleteConfirmButton
              checkedRowKeys={checkedRowKeysRef.value}
              onDelete={async () => {}}
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
              <DetailAboutView />
            </NCollapseItem>
            <NCollapseItem title="基本信息" name="basic">
              {/* {aboutValue.value && (
                <BasicAboutView
                  aboutValue={updateAboutbasic}
                  onUpdateValue={(value) => {
                    updateAboutbasic = value
                  }}
                />
              )} */}
            </NCollapseItem>
          </NCollapse>
        </ContentLayout>
      </>
    )
  },
})
