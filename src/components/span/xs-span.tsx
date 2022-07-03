export const XsSpan = defineComponent({
  props: {
    value: {
      type: String,
      require: true,
    }
  },
  setup: (props, ctx) => {
    return () => (
      <>
        <span class={'text-xs'}>{props.value}</span>
      </>
    )
  },
})