export const XsSpan = defineComponent({
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  setup: (props) => {
    return () => (
      <>
        <span class={'text-xs'}>{props.value}</span>
      </>
    )
  },
})
