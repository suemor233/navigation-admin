import { defineComponent } from 'vue'
import { ContentLayout } from '@/layouts/content'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { useRoute, useRouter } from 'vue-router'
import { NInput, useMessage } from 'naive-ui'
import { MyVditor } from '@/components/editor/vditor'
import { createDetail, detailInfoById, updateDetail } from '@/api/modules/about'
import { RouteName } from '@/router/name'
import { MaterialInput } from '@/components/input/material-input'
export default defineComponent({
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    let isUpdate = route.query.id
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
          <div class={'mt-1'}>
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
