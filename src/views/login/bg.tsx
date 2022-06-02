import { defineComponent } from 'vue'
import './index.css'
export const LoginBg =  defineComponent({
  setup(props, ctx) {
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
            所谓自由就是可以说二加二等于四的自由
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
