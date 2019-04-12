import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import routes from '@/router/routes.js';
import config from '@/config/config.js';
import {checkPermission,getToken,setTitle,clearToken} from '@/libs/util.js';
Vue.use(VueRouter);
// 路由配置
const router = new VueRouter({
  mode: 'hash',
  routes:routes
});
const LOGIN_PAGE_NAME = 'login';
const turnTo = (to, router, next) => {
  if(to.matched.length==0 && to.path!='/'){//路由找不到
    next({name:'404_page'});
  }else if(to.name=='index' || to.path=='/'){//默认路由
    next({name:config.defaultRouter || 'home'});
  }else if(to.meta && to.meta.permission && 
      !checkPermission(router.app.$store,to.meta.permission)){//没有权限
    next({name:'401_page',query:{toName:to.path}});
  }else{//正常跳转
    next();
  }
}

//路由前
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  const token =getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {// 未登录且要跳转的页面不是登录页，跳转到登录页
    next({name: LOGIN_PAGE_NAME});
  }else if (!token && to.name === LOGIN_PAGE_NAME) {//未登陆且要跳转的页面是登录页，跳转
    next()
  } else{
    if (router.app.$store.state.currentStore.hasUserInfo) {//如果已经获取了当前用户信息，则跳转
      turnTo(to,router,next)
    } else{//没有获取当前用户信息的则先获取再跳转
      router.app.$store.dispatch('getCurrent').then(user => {
        turnTo(to,router,next)
      }).catch(() => {
        iView.LoadingBar.error();
        turnTo(to,router,next)
        //clearToken();
        //next({name: LOGIN_PAGE_NAME});
      });
    }
  } 
});

//路由后
router.afterEach((to) => {
  iView.LoadingBar.finish();
  setTitle(router,to);
  window.scrollTo(0, 0);
  router.app.$store.commit('setMenu',to.name);
});

export default router;