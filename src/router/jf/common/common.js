const appPath='/jf/';
export default {
    home:{
        type:'mainMenu',
        path:appPath+'home',
        sort:10,
        component: (resolve) => require(['./views/home.vue'], resolve)
    },
    workspace:{
        type:'mainMenu',
        path:appPath+'workspace',
        component: (resolve) => require(['./views/workspace/workspace.vue'], resolve),
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
    person:{
        path:appPath+'common/person',
        component: (resolve) => require(['./views/person/person.vue'], resolve)
    },
    myImport:{
        path:appPath+'workspace/excel/myImport',
        component: (resolve) => require(['./views/workspace/excel/myImport.vue'], resolve),
        parent:'workspace'
    },
    myExport:{
        path:appPath+'workspace/excel/myExport',
        component: (resolve) => require(['./views/workspace/excel/myExport.vue'], resolve),
        parent:'workspace'
    },
    myTodo:{
        path:appPath+'workspace/workflow/myTodo',
        component: (resolve) => require(['./views/workspace/workflow/myTodo.vue'], resolve),
        parent:'workspace'
    },
    myApply:{
        path:appPath+'workspace/workflow/myApply',
        component: (resolve) => require(['./views/workspace/workflow/myApply.vue'], resolve),
        parent:'workspace'
    },
    myApprove:{
        path:appPath+'workspace/workflow/myApprove',
        component: (resolve) => require(['./views/workspace/workflow/myApprove.vue'], resolve),
        parent:'workspace'
    },
    myWorkflow:{
        path:appPath+'workspace/workflow/myWorkflow',
        component: (resolve) => require(['./views/workspace/workflow/myWorkflow.vue'], resolve),
        parent:'workspace'
    },
    applyPermission:{
        path:appPath+'workspace/apply/applyPermission',
        component: (resolve) => require(['./views/workspace/apply/applyPermission.vue'], resolve),
        parent:'workspace'
    },
};