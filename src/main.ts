import { createApp } from 'vue'
import '@fontsource-variable/urbanist'

import App from './App.vue'
import { router } from './router'
import './styles/main.css'

createApp(App).use(router).mount('#app')
