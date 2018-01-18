export default {
    home:{
        type:'mainMenu',
        title:'common.home',
        path:'/home',
        component: (resolve) => require(['../../views/home.vue'], resolve)
    },
    system:{
        type:'mainMenu',
        title:'menu.system',
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
        title:'menu.workspace',
        path:'/workspace',
        component: (resolve) => require(['../../views/workspace/workspace.vue'], resolve)
    },
    account:{
        title:'menu.account'
    },
    user:{
        title:'menu.user',
        path:'/system/account/user',
        component: (resolve) => require(['../../views/system/account/user.vue'], resolve),
        parent:'system'
    },
    role:{
        title:'menu.role',
        path:'/system/account/role',
        component: (resolve) => require(['../../views/system/account/role.vue'], resolve),
        parent:'system'
    },
    group:{
        title:'menu.group',
        path:'/system/account/group',
        component: (resolve) => require(['../../views/system/account/group.vue'], resolve),
        parent:'system'
    },
    permission:{
        title:'menu.permission',
        path:'/system/account/permission',
        component: (resolve) => require(['../../views/system/account/permission.vue'], resolve),
        parent:'system'
    },

    config:{
        title:'menu.config'
    },
    sitemap:{
        title:'menu.sitemap',
        path:'/system/config/sitemap',
        component: (resolve) => require(['../../views/system/config/sitemap.vue'], resolve),
        parent:'system'
    },
    property:{
        title:'menu.property',
        path:'/system/config/property',
        component: (resolve) => require(['../../views/system/config/property.vue'], resolve),
        parent:'system'
    },
    lookup:{
        title:'menu.lookup',
        path:'/system/config/lookup',
        component: (resolve) => require(['../../views/system/config/lookup.vue'], resolve),
        parent:'system'
    },
    i18n:{
        title:'menu.i18n',
        path:'/system/config/i18n',
        component: (resolve) => require(['../../views/system/config/i18n.vue'], resolve),
        parent:'system'
    },
    monitor:{
        title:'menu.monitor'
    },
    import:{
        title:'menu.import',
        path:'/system/monitor/import',
        component: (resolve) => require(['../../views/system/monitor/import.vue'], resolve),
        parent:'system'
    },
    export:{
        title:'menu.export',
        path:'/system/monitor/export',
        component: (resolve) => require(['../../views/system/monitor/export.vue'], resolve),
        parent:'system'
    },
    person:{
        title:'common.person',
        path:'/common/person',
        component: (resolve) => require(['../../views/common/person.vue'], resolve)
    }
};