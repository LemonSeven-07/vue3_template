import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';

import 'uno.css';
import 'normalize.css';
import './assets/style/index.scss';
const app = createApp(App);
app.use(router);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');
