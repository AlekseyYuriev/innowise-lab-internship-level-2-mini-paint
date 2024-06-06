import './assets/normalize.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PageLoader from './components/PageLoader.vue'

const app = createApp(App)

app.component('PageLoader', PageLoader)

app.use(createPinia())
app.use(router)

app.mount('#app')
