import { createApp } from 'vue'
import App from './App'
import { router } from './router'
import './styles/index.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).use(router).mount('#app')
