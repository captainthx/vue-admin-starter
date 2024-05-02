import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import i18n from '@/i18n';
import './index.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(antd);
app.use(i18n);

app.mount('#app');
