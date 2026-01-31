import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(VueQueryPlugin);
app.mount('#app');
