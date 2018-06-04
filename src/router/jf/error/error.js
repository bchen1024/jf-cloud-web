const appPath='/jf/';
export default {
    404:{
        path:appPath+'/error/404',
        component: (resolve) => require(['./views/404.vue'], resolve)
    },
    403:{
        path: appPath+'/error/403',
        component: (resolve) => require(['./views/403.vue'], resolve)
    }
};