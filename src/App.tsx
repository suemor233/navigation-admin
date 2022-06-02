import {defineComponent} from 'vue'

export default defineComponent({
    setup(props, ctx) {
        return () => (
            <>
                <router-view/>
            </>
        );
    }
})
