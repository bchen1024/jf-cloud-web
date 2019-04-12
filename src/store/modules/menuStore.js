import routes from '@/router/routes.js';
import {findIndexRouter,buildMenu,findRouter,findMenu,checkPermission} from '@/libs/util.js';
export default{
    state:{
        /**
         * 一级主菜单列表
         */
        mainMenus:[],
        /**
         * 当前一级主菜单路由名称
         */
        currentMainMenuName:'',
        /**
         * 二级子菜单列表
         */
        siderMenus:[],
        /**
         * 当前子菜单路由名称
         */
        currentSiderMenuName:'',
        /**
         * 当前展开的子菜单
         */
        openMenuName:'',
        /**
         * 当前面包屑列表
         */
        currentBreadcrumbs:[]
    },
    mutations:{
        /**
         * 初始化主菜单
         * @param {*} state 
         */
        loadMainMenus(state){
            if(state.mainMenus.length>0){
                return;
            }
            var mainMenus=[];
            var indexRouter=findIndexRouter(routes);
            //遍历路由筛选主菜单
            indexRouter.forEach(item=>{
                if(item && item.meta && item.meta.mainMenu){
                    var meta=item.meta;
                    var mainMenu=buildMenu(item.name,meta);
                    mainMenu.isRouter=true;
                    if(meta.children){
                        meta.children.forEach(value=>{
                            var router=findRouter(indexRouter,value.name);
                            var subMenu;
                            if(router){
                                subMenu=buildMenu(value.name,router.meta);
                                subMenu.isRouter=true;
                            }else{
                                subMenu=buildMenu(value.name,value);
                            }
                            if(value.children){
                                value.children.forEach(it=>{
                                    var subRouter=findRouter(indexRouter,it.name);
                                    var menu;
                                    if(subRouter){
                                        menu=buildMenu(it.name,subRouter.meta);
                                        menu.isRouter=true;
                                    }else{
                                        menu=buildMenu(it.name,it);
                                    }
                                    if((menu.permission && checkPermission(this,menu.permission))  || 
                                        !menu.isRouter ||
                                        !menu.permission){
                                        subMenu.children.push(menu);
                                    }
                                    if(menu.children.length==0){
                                        delete menu.children;
                                    }
                                });
                                if(subMenu.children.length>0){
                                    mainMenu.children.push(subMenu);
                                }
                                if(subMenu.children.length==0){
                                    delete subMenu.children;
                                }
                            }else{
                                if((subMenu.permission && checkPermission(this,subMenu.permission)) || 
                                    !subMenu.isRouter ||
                                    !subMenu.permission){
                                    mainMenu.children.push(subMenu);
                                }
                                if(mainMenu.children.length==0){
                                    delete mainMenu.children;
                                }
                            }
                        });
                        if(mainMenu.children.length>0){
                            mainMenus.push(mainMenu);
                        }
                    }else{//筛选没有子菜单的主菜单
                        if(mainMenu.children.length==0){
                            delete mainMenu.children;
                        }
                        mainMenus.push(mainMenu);
                    }
                    
                }
            });
            mainMenus.sort(function(a,b){
                return (a.sort || 999)-(b.sort || 999);
            });
            state.mainMenus=mainMenus;
        },
        setMenu(state,name='home'){
            //获取当前路由名称
            var currentName=name;
            //如果是index默认进入首页
            if(currentName=='index'){
                currentName='home';
            }
            //根据当前路由获取当前菜单信息
            var indexRouter=findIndexRouter(routes);
            var router=findRouter(indexRouter,currentName);
            if(router==null){
                return;
            }
            //获取当前主菜单名称
            if(state.mainMenus.length==0){
                this.commit('loadMainMenus');
            }
            var menu=findMenu(state.mainMenus,currentName);
            if(menu.currentBreadcrumbs.length==0){
                state.currentMainMenuName='';
                state.siderMenus=[];
                state.currentSiderMenuName='';
                state.openMenuName='';
                state.currentBreadcrumbs=[buildMenu(router.name,router.meta)];
                return
            }
            state.currentMainMenuName=menu.currentMainMenuName;
            state.siderMenus=menu.mainMenu.children || [];
            state.currentSiderMenuName=menu.currentSiderMenuName;
            state.openMenuName=menu.openMenuName;
            state.currentBreadcrumbs=menu.currentBreadcrumbs;
            if(currentName=='home'){
                state.currentBreadcrumbs=[];
            }
        }
    }
};