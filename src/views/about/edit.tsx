import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { createDetail, detailInfoById, updateDetail } from '@/api/modules/about'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { MyVditor } from '@/components/editor/vditor'
import { SendIcon } from '@/components/icons'
import { MaterialInput } from '@/components/input/material-input'
import { ContentLayout } from '@/layouts/content'
import { RouteName } from '@/router/name'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isUpdate = route.query.id
    const detailEdit = reactive({
      title: '',
      content: '',
    })
    const toast = useMessage()
    const slots = {
      header: () => (
        <HeaderActionButton
          variant="primary"
          icon={<SendIcon />}
          onClick={handleSubmit}
        ></HeaderActionButton>
      ),
      title: isUpdate ? '关于 · 修改介绍' : null,
    }

    const handleSubmit = async () => {
      if (detailEdit.title && detailEdit.content) {
        let res
        if (isUpdate) {
          res = await updateDetail(route.query.id as string, detailEdit)
        } else {
          res = await createDetail(detailEdit)
        }
        if (res) {
          toast.success(isUpdate ? '修改成功' : '创建成功')
          router.push({
            name: RouteName.ListAbout,
            query: {
              page: 1,
            },
          })
        }
      } else {
        toast.error('请填写完整内容')
      }
    }
    onMounted(async () => {
      if (isUpdate) {
        const res = (await detailInfoById(
          route.query.id as string,
        )) as typeof detailEdit
        res && Object.assign(detailEdit, res)
      }
    })

    watch(
      () => route.query.id,
      (id) => {
        route.name === RouteName.EditAbout && !id && location.reload()
      },
    )
    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <MaterialInput
            class="mt-3 relative z-10"
            label="请输入标题"
            value={detailEdit.title}
            onChange={(e) => {
              detailEdit.title = e
            }}
          ></MaterialInput>
          <div class={'mt-5'}>
            {(isUpdate ? detailEdit.content : true) && (
              <MyVditor
                text={detailEdit.content}
                onChange={(val) => (detailEdit.content = val)}
              />
            )}
          </div>
        </ContentLayout>
      </>
    )
  },
})
