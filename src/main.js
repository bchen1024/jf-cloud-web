import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import menus from './config/menus/index.js';
import VueI18n from 'vue-i18n';
import Locales from './config/locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh_CN']);
const mergeEN = Object.assign(enLocale, locales['en_US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
    router.app.$store.commit('forward',to.name);
});


const store = new Vuex.Store({
    state: {
        mainMenus:[],
        currentMainMenu:'',
        siderMenus:[],
        currentSiderMenu:'',
        openMenuName:'',
        currentBreadcrumbs:[]
    },
    getters: {
        
    },
    mutations: {
        /**
         * 初始化主菜单
         * @param {*} state 
         */
        loadMainMenus(state){
            var mainMenus=[];
            for(var name in menus){
                var mainMenu=menus[name];
                if(mainMenu.type=='mainMenu'){
                    mainMenus.push({
                        name:name,
                        title:mainMenu.title
                    });
                }
            }
            state.mainMenus=mainMenus;
        },
        forward(state,name='home'){
            //获取当前路由名称
            var currentName=name || router.name;
            //如果是index默认进入首页
            if(currentName=='index'){
                currentName='home';
            }
            //根据当前路由获取当前菜单信息
            var currentMenu=menus[currentName];
            //获取当前主菜单名称
            var currentMainMenu=currentMenu.parent || currentName;
            //跟主菜单名称获取主菜单信息
            var mainMenu=menus[currentMainMenu];
            //当前导航路由数组
            var currentBreadcrumbs=[];
            //添加主菜单到导航路由中
            currentBreadcrumbs.push({
                name:currentMainMenu,
                title:mainMenu.title,
                path:mainMenu.path
            });

            var children=mainMenu.children;
            var siderMenus=[];
            if(children && children.length>0){
                for(var menu of children){
                    var menuObj={
                        name:menu.name,
                        title:menus[menu.name].title
                    };
                    var childrens=menu.children;
                    if(childrens && childrens.length>0){
                        var c=[];
                        for(var sub of childrens){
                            var subObj={
                                name:sub.name,
                                title:menus[sub.name].title
                            };
                            c.push(subObj);
                            if(currentName==sub.name){
                                state.openMenuName=menu.name;
                                currentBreadcrumbs.push({
                                    name:menu.name,
                                    title:menus[menu.name].title
                                });
                                currentBreadcrumbs.push({
                                    name:sub.name,
                                    title:menus[sub.name].title,
                                    path:menus[sub.name].path
                                });
                            }
                        }
                        menuObj.children=c;
                    }
                    siderMenus.push(menuObj);
                }
            }

            state.currentMainMenu=currentMainMenu;
            state.siderMenus=siderMenus;
            state.currentSiderMenu=currentName;
            if(currentName=='home'){
                currentBreadcrumbs=[];
            }
            state.currentBreadcrumbs=currentBreadcrumbs;
            //router.push({name:currentName});
        }
    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});