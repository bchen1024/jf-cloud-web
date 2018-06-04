const appPath='/jf/';
export default {
    login:{
        path:appPath+'login',
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    index:{
        path: '/jf',
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
};