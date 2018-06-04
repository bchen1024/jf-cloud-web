import index from './public/index.js';
import cloud from './cloud/cloud.js';
import common from './common/common.js';
import error from './error/error.js';

export default{
    getRouters(){
        var routerObj={};
        var routerArray=this.objToArray(cloud,routerObj)
                .concat(this.objToArray(common,routerObj))
                .concat(this.objToArray(error,routerObj));
        var routers =this.objToArray(index,routerObj,routerArray);
        return {
            routerObj,
            routers
        };
    },
    /**
     * 将路由对象转换成数组
     * @param  obj 
     */
    objToArray(obj,routerObj,children){
        var routers=[];
        if(obj){
            //便利路由对象
            for(var name in obj){
                var menu=obj[name];
                menu.name=name;
                if(!menu.title){
                    menu.title='menu.'+name;
                }
                if(routerObj){
                    var copyMenu={
                        name:menu.name,
                        title:menu.title
                    };
                    if(menu.path){
                        copyMenu.path=menu.path;
                    }
                    if(menu.children){
                        copyMenu.children=menu.children;
                    }
                    if(menu.type){
                        copyMenu.type=menu.type;
                    }
                    if(menu.parent){
                        copyMenu.parent=menu.parent;
                    }
                    if(menu.sort){
                        copyMenu.sort=menu.sort;
                    }
                    routerObj[name]=copyMenu;                
                }
                //筛选存在组件配置的对象
                if(menu.component){
                    delete menu.children;
                    if(name=='index'){
                        if(children && children.length>0){
                            menu.children=children;
                        }
                    }
                    routers.push(menu);
                }
            }
        }
        return routers;
    }
};