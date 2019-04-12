import Vue from 'vue';
import iView from 'iview';
import i18n from '@/locale';
import store from '@/store/index.js';
import router from '@/router/index.js';
import JFView from '@/components/index.js';
import 'iview/dist/styles/iview.css';
import '@/mock';

import App from './app.vue';
Vue.use(iView,{
    i18n: (key, value) => i18n.t(key, value)
});

Vue.use(JFView);

new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
});