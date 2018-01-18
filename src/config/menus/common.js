export default {
    home:{
        type:'mainMenu',
        title:'首页',
        path:'/home',
        component: (resolve) => require(['../../views/home.vue'], resolve)
    },
    system:{
        type:'mainMenu',
        title:'系统管理',
        path:'/system',
        component: (resolve) => require(['../../views/system/system.vue'], resolve),
        children:[
            {name:'account',children:[
                {name:'user'},
                {name:'role'},
                {name:'group'},
                {name:'permission'}
            ]},
            {name:'config',children:[
                {name:'sitemap'},
                {name:'property'},
                {name:'lookup'},
                {name:'i18n'}
            ]},
            {name:'monitor',children:[
                {name:'import'},
                {name:'export'}
            ]}
        ]
    },
    workspace:{
        type:'mainMenu',
        title:'工作空间',
        path:'/workspace',
        component: (resolve) => require(['../../views/workspace/workspace.vue'], resolve)
    },
    account:{
        title:'账户管理'
    },
    user:{
        title:'用户管理',
        path:'/system/account/user',
        component: (resolve) => require(['../../views/system/account/user.vue'], resolve),
        parent:'system'
    },
    role:{
        title:'角色管理',
        path:'/system/account/role',
        component: (resolve) => require(['../../views/system/account/role.vue'], resolve),
        parent:'system'
    },
    group:{
        title:'群组管理',
        path:'/system/account/group',
        component: (resolve) => require(['../../views/system/account/group.vue'], resolve),
        parent:'system'
    },
    permission:{
        title:'权限点管理',
        path:'/system/account/permission',
        component: (resolve) => require(['../../views/system/account/permission.vue'], resolve),
        parent:'system'
    },

    config:{
        title:'参数配置'
    },
    sitemap:{
        title:'菜单栏目',
        path:'/system/config/sitemap',
        component: (resolve) => require(['../../views/system/config/sitemap.vue'], resolve),
        parent:'system'
    },
    property:{
        title:'数据字典',
        path:'/system/config/property',
        component: (resolve) => require(['../../views/system/config/property.vue'], resolve),
        parent:'system'
    },
    lookup:{
        title:'Lookup管理',
        path:'/system/config/lookup',
        component: (resolve) => require(['../../views/system/config/lookup.vue'], resolve),
        parent:'system'
    },
    i18n:{
        title:'国际化管理',
        path:'/system/config/i18n',
        component: (resolve) => require(['../../views/system/config/i18n.vue'], resolve),
        parent:'system'
    },
    monitor:{
        title:'系统监控'
    },
    import:{
        title:'导入监控',
        path:'/system/monitor/import',
        component: (resolve) => require(['../../views/system/monitor/import.vue'], resolve),
        parent:'system'
    },
    export:{
        title:'导出监控',
        path:'/system/monitor/export',
        component: (resolve) => require(['../../views/system/monitor/export.vue'], resolve),
        parent:'system'
    },
    person:{
        title:'个人中心',
        path:'/common/person',
        component: (resolve) => require(['../../views/common/person.vue'], resolve)
    }
};