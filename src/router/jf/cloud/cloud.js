const appPath='/jf/cloud/';
export default {
    system:{
        type:'mainMenu',
        path:appPath+'system',
        sort:990,
        component: (resolve) => require(['./views/system/system.vue'], resolve),
        children:[
            {name:'account',children:[
                {name:'user'},
                {name:'role'},
                {name:'group'},
                {name:'permission'},
                {name:'app'}
            ]},
            {name:'config',children:[
                {name:'property'},
                {name:'lookup'},
                {name:'i18n'}
               
            ]},
            {name:'monitor',children:[
                {name:'import'},
                {name:'export'},
                {name:'auditLog'}
            ]}
        ]
    },
    user:{
        path:appPath+'system/account/user',
        component: (resolve) => require(['./views/system/account/user.vue'], resolve),
        parent:'system'
    },
    role:{
        path:appPath+'system/account/role',
        component: (resolve) => require(['./views/system/account/role.vue'], resolve),
        parent:'system'
    },
    group:{
        path:appPath+'system/account/group',
        component: (resolve) => require(['./views/system/account/group.vue'], resolve),
        parent:'system'
    },
    permission:{
        path:appPath+'system/account/permission',
        component: (resolve) => require(['./views/system/account/permission.vue'], resolve),
        parent:'system'
    },
    app:{
        path:appPath+'system/account/app',
        component: (resolve) => require(['./views/system/account/app.vue'], resolve),
        parent:'system'
    },
    property:{
        path:appPath+'system/config/property',
        component: (resolve) => require(['./views/system/config/property.vue'], resolve),
        parent:'system'
    },
    lookup:{
        path:appPath+'system/config/lookup',
        component: (resolve) => require(['./views/system/config/lookup.vue'], resolve),
        parent:'system'
    },
    i18n:{
        path:appPath+'system/config/i18n',
        component: (resolve) => require(['./views/system/config/i18n.vue'], resolve),
        parent:'system'
    },
    auditLog:{
        path:appPath+'system/monitor/auditLog',
        component: (resolve) => require(['./views/system/monitor/auditLog.vue'], resolve),
        parent:'system'
    }
};