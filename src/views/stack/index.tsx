import { stackInfo, updateStack } from '@/api/modules/stack'
import { HeaderActionButton } from '@/components/button/rounded-button'
import { SendIcon } from '@/components/icons'
import { ContentLayout } from '@/layouts/content'
import { Stack } from '@/models/StackType'
import { useMessage } from 'naive-ui'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { ProgressView } from './progress'
export const StackView = defineComponent({
  setup(props, ctx) {
    const StackValue = ref<Stack[] | null>(null)
    const toast = useMessage()
    const slots = {
      header: () => (
        <HeaderActionButton
          variant="primary"
          icon={<SendIcon />}
          onClick={async () => {
            StackValue.value && handleStackUpdate(StackValue.value)
          }}
        ></HeaderActionButton>
      ),
    }


    const handleStackUpdate = async (value: Stack[]) => {
      const success = await updateStack(value)
      if (success) {
        toast.success('修改成功')
        await handleStackInfo()
      }
    }

    const handleStackInfo = async () => {
      const res = (await stackInfo()) as Record<'data', Stack[]>
      if (res) {
        StackValue.value = res.data
        return true
      }
    }

    onMounted(async () => {
      handleStackInfo()
    })
    return () => (
      <>
        <ContentLayout v-slots={slots}>
          <div>
            {StackValue.value && (
              <ProgressView
                stackValue={StackValue.value}
                onUpdateValue={(value) => {
                  StackValue.value = value
                }}
              />
            )}
          </div>
        </ContentLayout>
      </>
    )
  },
})
