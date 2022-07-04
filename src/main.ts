import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App'
import { router } from './router'

import './styles/index.css'
import 'virtual:windi.css'

const app = createApp(App)
app.use(createPinia())
app.use(router).mount('#app')
