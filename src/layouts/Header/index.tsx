import {defineComponent} from 'vue'

export const Header =  defineComponent({
    setup(props, ctx) {
        const {slots} = ctx
        return () => (
                <div>
                    {
                        slots.default ? slots.default() : null
                    }
                </div>
        );
    }
})
