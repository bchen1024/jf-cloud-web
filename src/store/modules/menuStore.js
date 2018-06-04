export default{
    state:{
        menuMap:{},
        mainMenus:[],
        currentMainMenu:'',
        siderMenus:[],
        currentSiderMenu:'',
        openMenuName:'',
        currentBreadcrumbs:[]
    },
    mutations:{
        /**
         * 初始化主菜单
         * @param {*} state 
         */
        loadMainMenus(state){
            var mainMenus=[];
            for(var name in state.menuMap){
                var mainMenu=state.menuMap[name];
                if(mainMenu.type=='mainMenu'){
                    mainMenus.push({
                        name:name,
                        title:mainMenu.title,
                        sort:mainMenu.sort
                    });
                }
            }
            mainMenus.sort(function(a,b){
                return (a.sort || 999)-(b.sort || 999);
            });
            state.mainMenus=mainMenus;
        },
        forward(state,name='home'){
            //获取当前路由名称
            var currentName=name; //|| router.name;
            //如果是index默认进入首页
            if(currentName=='index'){
                currentName='home';
            }
            //根据当前路由获取当前菜单信息
            var currentMenu=state.menuMap[currentName];
            if(currentMenu==null){
                return;
            }
            //获取当前主菜单名称
            var currentMainMenu=currentMenu.parent || currentName;
            //跟主菜单名称获取主菜单信息
            var mainMenu=state.menuMap[currentMainMenu];
            //当前导航路由数组
            var currentBreadcrumbs=[];
            //添加主菜单到导航路由中
            currentBreadcrumbs.push({
                name:currentMainMenu,
                title:mainMenu.title,
                path:mainMenu.path
            });

            var children=mainMenu.children;
            var siderMenus=[];
            if(children && children.length>0){
                for(var menu of children){
                    var menuObj={
                        name:menu.name,
                        title:'menu.'+menu.name
                    };
                    var childrens=menu.children;
                    if(childrens && childrens.length>0){
                        var c=[];
                        for(var sub of childrens){
                            if(!state.menuMap[sub.name] || state.menuMap[sub.name].permission){
                                continue;
                            }
                            var subObj={
                                name:sub.name,
                                title:'menu.'+sub.name
                            };
                            c.push(subObj);
                            if(currentName==sub.name){
                                state.openMenuName=menu.name;
                                currentBreadcrumbs.push({
                                    name:menu.name,
                                    title:'menu.'+menu.name
                                });
                                currentBreadcrumbs.push({
                                    name:sub.name,
                                    title:'menu.'+sub.name,
                                    path:state.menuMap[sub.name].path
                                });
                            }
                        }
                        menuObj.children=c;
                    }
                    if(menuObj.children.length>0){
                        siderMenus.push(menuObj);
                    }
                }
            }

            state.currentMainMenu=currentMainMenu;
            state.siderMenus=siderMenus;
            state.currentSiderMenu=currentName;
            if(currentName=='home'){
                currentBreadcrumbs=[];
            }
            state.currentBreadcrumbs=currentBreadcrumbs;
        }
    }
};