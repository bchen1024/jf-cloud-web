import {common} from '@/api';
export default{
    state:{
        hasUserInfo:false,
        hasUserError:false,
        currentUser:{},
        currentApp:{},
        appList:[],
        roleList:[],
        groupList:[],
        permissionList:[]
    },
    mutations:{
        setCurrent(state,current){
            if(current){
                //当前用户
                if(current.user){
                    state.currentUser=current.user;
                }
                //当前用户拥有的应用
                if(current.appList && current.appList.length>0){
                    state.appList=current.appList;
                    //获取浏览器缓存的应用
                    let currentApp=localStorage.getItem("currentApp");
                    if(currentApp){//浏览器存在缓存也再范围内，则默认浏览器缓存的应用，否则默认第一个
                        let app=current.appList.filter(item=>{return item.appCode==currentApp});
                        if(app && app.length>0){
                            this.commit('setCurrentApp',app[0]);
                        }else{
                            this.commit('setCurrentApp',current.appList[0]);
                        }
                    }else{//浏览器不存在缓存即默认第一个
                        this.commit('setCurrentApp',current.appList[0]);
                    }
                }else{
                    localStorage.removeItem("currentApp");
                }
                //当前权限点
                if(current.permissionList && current.permissionList.length>0){
                    state.permissionList=current.permissionList;
                }
                //当前角色
                if(current.roleList && current.roleList.length>0){
                    state.roleList=current.roleList;
                }
                //当前群组
                if(current.groupList && current.groupList.length>0){
                    state.groupList=current.groupList;
                }
            }
        },
        setCurrentApp(state,currentApp){
            state.currentApp=currentApp;
            localStorage.setItem("currentApp",currentApp.appCode);
        },
        switchApp(state,appCode){
            let app=state.appList.filter(item=>{return item.appCode==appCode});
            if(app && app.length>0){
                this.commit('setCurrentApp',app[0]);
                document.location.reload();
            }
        }
    },
    actions:{
        getCurrent({state,commit}){
            var _this=this;
            return new Promise((resolve, reject) => {
                common.getCurrent().then(result => {
                    state.hasUserInfo=true;
                    if(result && result.user){
                        commit('setCurrent',result);
                        commit('loadMainMenus');
                        resolve(result);
                    }else{
                        _this._vm.$router.replace({name:'login',query:{redirectName:_this._vm.$route.name}});
                    }
                }).catch(error => {
                    state.hasUserInfo=true;
                    state.hasUserError=true;
                    reject(error);
                });
              })
            
        }
    }
};