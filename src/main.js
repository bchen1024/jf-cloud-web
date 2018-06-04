import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import 'iview/dist/styles/iview.css';
import JFView from './components/index.js';
import JFPlugins from './plugins/index.js';
import JFServices from './services/index.js';
import stores from './store/index.js';
import routerObj from './router/jf/router.js';
import App from './app.vue';
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(JFView);
Vue.use(JFPlugins);
Vue.use(JFServices);

//初始化国际化
JFPlugins.plugins.$JFI18n.init(Vue);

// 路由配置
const router = new VueRouter({
    mode: 'history',
    routes: routerObj.routers
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if(to.matched.length==0){
        next({
            name:'404'
        });
    }else if(to.name=='index' || to.path=='/'){
        next({
            name:'home'
        });
    }else{
        window.document.title = router.app.$t(to.meta.title);
        next();
    }
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
    router.app.$store.commit('forward',to.name);
});

stores.menuStore.state.menuMap=routerObj.routerObj;
const store = new Vuex.Store({
    modules:stores
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});