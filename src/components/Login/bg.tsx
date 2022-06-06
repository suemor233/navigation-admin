import { fetchHitokoto, SentenceType } from '@/api/modules/hitokoto'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { pick } from 'lodash-es'
import './index.css'
export const LoginBg =  defineComponent({
  setup(props, ctx) {
    const hitokoto = ref('')

    const refreshHitokoto = () => {
      fetchHitokoto([
        SentenceType.动画,
        SentenceType.原创,
        SentenceType.哲学,
        SentenceType.文学,
      ]).then((data) => {
        const postfix = Object.values(
          pick(data, ['from', 'from_who', 'creator']),
        ).filter(Boolean)[0]
        if (!data.hitokoto) {
          hitokoto.value = '没有获取到句子信息'
        } else {
          hitokoto.value = data.hitokoto + (postfix ? ' —— ' + postfix : '')
        }
      }).catch(()=>{
        refreshHitokoto()
      })
    }

    onBeforeMount(()=>{
      refreshHitokoto()
    })
    return () => (
      <>
        <div
          class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(${'https://y.suemor.com/imagesauth-bg.jpg'})`,
          }}
        >
          <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div class="w-full max-w-md z-10">
            <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
            引导页管理系统
              <span class="text-3xl"></span>
            </div>
            <div class="sm:text-sm xl:text-md text-gray-200 font-normal">
              {
                hitokoto.value ? hitokoto.value : '加载中...'
              }
            </div>
          </div>
          <ul class="circles">
            {Array.from({ length: 10 }).map((i) => {
              return <li></li>
            })}
          </ul>
        </div>
      </>
    )
  },
})
