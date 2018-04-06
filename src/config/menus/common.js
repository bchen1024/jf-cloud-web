export default {
    home:{
        type:'mainMenu',
        title:'common.home',
        path:'home',
        component: (resolve) => require(['../../views/home.vue'], resolve)
    },
    system:{
        type:'mainMenu',
        title:'menu.system',
        path:'system',
        component: (resolve) => require(['../../views/system/system.vue'], resolve),
        children:[
            {name:'account',children:[
                {name:'user'},
                {name:'role'},
                {name:'group'},
                {name:'permission'}
            ]},
            {name:'config',children:[
                {name:'property'},
                {name:'lookup'},
                {name:'i18n'},
                {name:'app'}
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
        path:'workspace',
        component: (resolve) => require(['../../views/workspace/workspace.vue'], resolve),
        children:[
            {name:'importOrExport',children:[
                {name:'myImport'},
                {name:'myExport'}
            ]},
            {name:'workTodo',children:[
                {name:'myTodo'},
                {name:'myApply'},
                {name:'myApprove'},
                {name:'myWorkflow'}
            ]},
            {name:'applyMgt',children:[
                {name:'applyPermission'},
                {name:'applyApp'}
            ]}
        ]
    },
    account:{
        title:'menu.account'
    },
    user:{
        title:'menu.user',
        path:'system/account/user',
        component: (resolve) => require(['../../views/system/account/user.vue'], resolve),
        parent:'system'
    },
    role:{
        title:'menu.role',
        path:'system/account/role',
        component: (resolve) => require(['../../views/system/account/role.vue'], resolve),
        parent:'system'
    },
    group:{
        title:'menu.group',
        path:'system/account/group',
        component: (resolve) => require(['../../views/system/account/group.vue'], resolve),
        parent:'system'
    },
    permission:{
        title:'menu.permission',
        path:'system/account/permission',
        component: (resolve) => require(['../../views/system/account/permission.vue'], resolve),
        parent:'system'
    },

    config:{
        title:'menu.config'
    },
    property:{
        title:'menu.property',
        path:'system/config/property',
        component: (resolve) => require(['../../views/system/config/property.vue'], resolve),
        parent:'system'
    },
    lookup:{
        title:'menu.lookup',
        path:'system/config/lookup',
        component: (resolve) => require(['../../views/system/config/lookup.vue'], resolve),
        parent:'system'
    },
    i18n:{
        title:'menu.i18n',
        path:'system/config/i18n',
        component: (resolve) => require(['../../views/system/config/i18n.vue'], resolve),
        parent:'system'
    },
    app:{
        title:'menu.app',
        path:'system/config/app',
        component: (resolve) => require(['../../views/system/config/app.vue'], resolve),
        parent:'system'
    },
    monitor:{
        title:'menu.monitor'
    },
    import:{
        title:'menu.import',
        path:'excel/import',
        component: (resolve) => require(['../../views/excel/import.vue'], resolve),
        parent:'system',
        permission:'excelImport$page'
    },
    export:{
        title:'menu.export',
        path:'excel/export',
        component: (resolve) => require(['../../views/excel/export.vue'], resolve),
        parent:'system',
        permission:'excelExport$page'
    },
    person:{
        title:'common.person',
        path:'common/person',
        component: (resolve) => require(['../../views/common/person.vue'], resolve)
    },
    importOrExport:{
        title:'menu.myImportOrExport'
    },
    myImport:{
        title:'menu.myImport',
        path:'excel/myImport',
        component: (resolve) => require(['../../views/excel/myImport.vue'], resolve),
        parent:'workspace'
    },
    myExport:{
        title:'menu.myExport',
        path:'excel/myExport',
        component: (resolve) => require(['../../views/excel/myExport.vue'], resolve),
        parent:'workspace'
    },
    workTodo:{
        title:'menu.myWorkTodo'
    },
    myTodo:{
        title:'menu.myTodo',
        path:'workspace/workflow/myTodo',
        component: (resolve) => require(['../../views/workspace/workflow/myTodo.vue'], resolve),
        parent:'workspace'
    },
    myApply:{
        title:'menu.myApply',
        path:'workspace/workflow/myApply',
        component: (resolve) => require(['../../views/workspace/workflow/myApply.vue'], resolve),
        parent:'workspace'
    },
    myApprove:{
        title:'menu.myApprove',
        path:'workspace/workflow/myApprove',
        component: (resolve) => require(['../../views/workspace/workflow/myApprove.vue'], resolve),
        parent:'workspace'
    },
    myWorkflow:{
        title:'menu.myWorkflow',
        path:'workspace/workflow/myWorkflow',
        component: (resolve) => require(['../../views/workspace/workflow/myWorkflow.vue'], resolve),
        parent:'workspace'
    },
    applyMgt:{
        title:'menu.applyMgt'
    },
    applyPermission:{
        title:'menu.applyPermission',
        path:'workspace/apply/applyPermission',
        component: (resolve) => require(['../../views/workspace/apply/applyPermission.vue'], resolve),
        parent:'workspace'
    },
};