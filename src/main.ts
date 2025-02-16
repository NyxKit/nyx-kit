import './styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vClickOutside } from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', vClickOutside)

app.mount('#app')
