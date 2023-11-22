import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import lang from './locale/lang'
import './index.css'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  messages: {
    en: lang.en,
    th: lang.th,
    ja: lang.ja
  }
})
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(antd)
app.use(i18n)

app.mount('#app')
