import { resolve } from "path";
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PUBLIC_URL } = env
  const isDev = mode === 'development'
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      WindiCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue\??/, // .vue
        ],
        dts: './src/auto-import.d.ts',
        imports: ['vue', 'pinia', '@vueuse/core'],
      }),
    ],
    server: {
      port: 2345,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "/src"),
      },
    },
    define: {
      __DEV__: isDev,
    },
    base: !isDev ? VITE_APP_PUBLIC_URL || '' : '',
  })
}

