import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import './assets/styleTheme.css';

createApp(App).use(router).mount('#app');
