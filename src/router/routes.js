
/**
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
    {name:'index',path:'',component: (resolve) => require(['@/views/index.vue'], resolve),children:[
        {name:'404_page',path:'/error/404_page',component: (resolve) => require(['@/views/error/404_page.vue'], resolve)},
        {name:'401_page',path:'/error/401_page',component: (resolve) => require(['@/views/error/401_page.vue'], resolve)},
        {name:'home',path:'home',component: (resolve) => require(['@/views/pub/home.vue'], resolve),meta:{
            mainMenu:true,
            icon:'ios-home-outline',
            sort:-1000,
        }},
        //工作空间
        {name:'workspace',path:'/workspace',component: (resolve) => require(['@/views/workspace/workspace.vue'], resolve),meta:{
            mainMenu:true,
            icon:'ios-desktop-outline',
            sort:1000,
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
                    {name:'applyPermission'}
                ]}
            ]
        }},
        {name:'myImport',path:'/workspace/excel/myImport',component: (resolve) => require(['@/views/workspace/excel/myImport.vue'], resolve)},
        {name:'myExport',path:'/workspace/excel/myExport',component: (resolve) => require(['@/views/workspace/excel/myExport.vue'], resolve)},
        {name:'myApply',path:'/workspace/workflow/myApply',component: (resolve) => require(['@/views/workspace/workflow/myApply.vue'], resolve)},
        {name:'myApprove',path:'/workspace/workflow/myApprove',component: (resolve) => require(['@/views/workspace/workflow/myApprove.vue'], resolve)},
        {name:'myTodo',path:'/workspace/workflow/myTodo',component: (resolve) => require(['@/views/workspace/workflow/myTodo.vue'], resolve)},
        {name:'myWorkflow',path:'/workspace/workflow/myWorkflow',component: (resolve) => require(['@/views/workspace/workflow/myWorkflow.vue'], resolve)},
        {name:'applyPermission',path:'/workspace/workflow/applyPermission',component: (resolve) => require(['@/views/workspace/workflow/applyPermission.vue'], resolve)},
        //个人中心
        {name:'person',path:'/person',component: (resolve) => require(['@/views/person/person.vue'], resolve)},
        //系统配置
        {name:'system',path:'/system',component: (resolve) => require(['@/views/system/system.vue'], resolve),meta:{
            mainMenu:true,
            icon:'ios-construct-outline',
            children:[
                {name:'account',icon:'md-people',children:[
                    {name:'user'},
                    {name:'role'},
                    {name:'group'},
                    {name:'permission'},
                    {name:'app'}
                ]},
                {name:'config',icon:'ios-settings',children:[
                    {name:'property'},
                    {name:'lookup'},
                    {name:'i18n'}
                ]},
                {name:'monitor',icon:'ios-easel',children:[
                    {name:'importMonitor'},
                    {name:'exportMonitor'},
                    {name:'auditLog'}
                ]}
            ]
        }},
        /**
         * 应用管理
         */
        {
            name:'app',
            path:'/system/account/app',
            component: (resolve) => require(['@/views/system/account/app.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$app$page',
                icon:'ios-apps'
            }
        },
        /**
         * 群组管理
         */
        {
            name:'group',
            path:'/system/account/group',
            component: (resolve) => require(['@/views/system/account/group.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$group$page',
                icon:'ios-people'
            }
        },
        /**
         * 权限管理
         */
        {
            name:'permission',
            path:'/system/account/permission',
            component: (resolve) => require(['@/views/system/account/permission.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$permission$page',
                icon:'ios-lock'
            }
        },
        /**
         * 角色管理
         */
        {
            name:'role',
            path:'/system/account/role',
            component: (resolve) => require(['@/views/system/account/role.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$role$page',
                icon:'md-person'
            }
        },
        /**
         * 用户管理
         */
        {
            name:'user',
            path:'/system/account/user',
            component: (resolve) => require(['@/views/system/account/user.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$user$page',
                icon:'ios-person'
            }
        },
        /**
         * 国际化管理
         */
        {
            name:'i18n',
            path:'/system/config/i18n',
            component: (resolve) => require(['@/views/system/config/i18n.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$i18n$page'
            }
        },
        /**
         * lookup管理
         */
        {
            name:'lookup',
            path:'/system/config/lookup',
            component: (resolve) => require(['@/views/system/config/lookup.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$lookup$page'
            }
        },
        /**
         * 数据字典
         */
        {
            name:'property',
            path:'/system/config/property',
            component: (resolve) => require(['@/views/system/config/property.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$property$page'
            }
        },
        /**
         * 栏目管理
         */
        {
            name:'sitemap',
            path:'/system/config/sitemap',
            component: (resolve) => require(['@/views/system/config/sitemap.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$sitemap$page'
            }
        },
        //审计日志监控
        {
            name:'auditLog',
            path:'/system/monitor/auditLog',
            component: (resolve) => require(['@/views/system/monitor/auditLog.vue'], resolve),
            meta:{
                permission:'jf-cloud-monitor$auditLog$page'
            }
        },
        /**
         * 导出监控
         */
        {
            name:'exportMonitor',
            path:'/system/monitor/exportMonitor',
            component: (resolve) => require(['@/views/system/monitor/exportMonitor.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$export$page'
            }
        },
        /**
         * 导入监控
         */
        {
            name:'importMonitor',
            path:'/system/monitor/importMonitor',
            component: (resolve) => require(['@/views/system/monitor/importMonitor.vue'], resolve),
            meta:{
                permission:'jf-cloud-platform$import$page'
            }
        }
    ]},
    {name:'login',path:'login',component: (resolve) => require(['@/views/login.vue'], resolve)}
]
