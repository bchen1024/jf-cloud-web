/**
 * 根据名称查找路由
 * @param {*} routers 
 * @param {*} name 
 */
export const findRouter = (routers,name) => {
  if(routers && routers.length > 0){
    let router=routers.filter(item=>item.name==name);
    if(router.length>0){
      return router[0];
    }
  }
  return null;
};
/**
 * 查找首页路由
 * @param {*} routers 
 */
export const findIndexRouter = (routers) => {
  var indexRouter=[];
  routers.forEach(item => {
    if(item && item.name=='index'){
      indexRouter=item.children;
      return;
    }
  });
  return indexRouter;
};

/**
 * 根据路由元数据构建菜单信息
 * @param {*} name 
 * @param {*} item 
 */
export const buildMenu = (name,item={}) => {
  var menu={name:name,title:'menu.'+name,children:[]};
  if(item.icon){
    menu.icon=item.icon;
  }
  if(item.sort){
    menu.sort=item.sort;
  }
  if(item.title){
    menu.title=item.title;
  }
  if(item.permission){
    menu.permission=item.permission;
  }
  return menu;
};

/**
 * 根据路由名称找出主菜单，子菜单和面包屑信息
 * @param {*} mainMenus 
 * @param {*} name 
 */
export const findMenu = (mainMenus=[],name) => {
  var menu={currentBreadcrumbs:[]};
  
  //路由是主菜单的场景，只找第一层
  mainMenus.forEach(item=>{
    if(item.name==name){
      menu.currentMainMenuName=item.name;
      menu.mainMenu=item;
      menu.currentBreadcrumbs.push(item);
    }
  });

  //路由是二级子菜单的场景
  if(!menu.currentMainMenuName){
    mainMenus.forEach(item=>{
      if(item.children && item.children.length>0){
        item.children.forEach(it=>{
          if(it.name==name){
            menu.currentMainMenuName=item.name;
            menu.mainMenu=item;
            menu.currentSiderMenuName=it.name;
            menu.currentBreadcrumbs.push(item);
            menu.currentBreadcrumbs.push(it);
          }
        });
      }
    });
  }

  //路由是三级菜单的场景
  if(!menu.currentMainMenuName){
    mainMenus.forEach(item=>{
      if(item.children && item.children.length>0){
        item.children.forEach(it=>{
          if(it.children && it.children.length>0){
            it.children.forEach(vt=>{
              if(vt.name==name){
                menu.currentMainMenuName=item.name;
                menu.mainMenu=item;
                menu.currentSiderMenuName=vt.name;
                menu.openMenuName=it.name;
                menu.currentBreadcrumbs.push(item);
                menu.currentBreadcrumbs.push(it);
                menu.currentBreadcrumbs.push(vt);
              }
            });
          }
        });
      }
    });
  }
  return menu;
};

/**
 * 检查权限
 * @param {*} permissions 
 * @param {*} permission 
 */
export const checkPermission=(store,permission)=>{
  /*var permissions=store.state.currentStore.permissionList || [];
  if(permission && permission.indexOf("&")<0 && permission.indexOf("||")<0){
    return permissions.indexOf(permission)>-1;
  }else if(permission && permission.indexOf("&")>-1){

  }*/
  return true;
};

/**
 * 获取当前语言
 */
export const getCurrentLanguage=()=>{
  const langs=['zh-CN','en-US'];
  // 自动根据浏览器系统语言设置语言
  const navLang = navigator.language
  const localLang = (langs.indexOf(navLang)>-1) ? navLang : false
  let lang = localStorage.getItem('currentLanguage') || localLang ||  'zh-CN';
  if(langs.indexOf(lang)<0){
    console.warn('当前获取的语言为${lang},不符合规范，默认为zh-CN');
    lang='zh-CN';
  }
  return lang;
};

/**
 * 获取token
 */
export const getToken=()=>{
  return sessionStorage.getItem("token");
};

export const setToken=(token)=>{
  return sessionStorage.setItem("token",token);
};

export const clearToken=()=>{
  return sessionStorage.removeItem("token");
};

/**
 * 设置标题
 * @param {*} router 
 * @param {*} to 
 */
export const setTitle=(router,to)=>{
  if(to.meta && to.meta.title){
    document.title=router.app.$t(to.meta.title);
  }else{
    document.title = router.app.$t('menu.'+to.name);
  }
};

export const formatDate=(value, format)=>{
  if (!value) {
      return null;
  }
  if(!format){
      format="datetime";
  }
  if(typeof value =='number'){
      value=new Date(value);
  }
  var year = value.getFullYear();// 当前年份，yyyy

  var month = value.getMonth() + 1;// 当前月份 0-11
  if (month < 10) {
      month = "0" + month;
  }

  var date = value.getDate();// 当前日期 1-31
  if (date < 10) {
      date = "0" + date;
  }
  // 小时
  var hours = value.getHours();
  if (hours < 10) {
      hours = "0" + hours;
  }
  // 分钟
  var min = value.getMinutes();
  if (min < 10) {
      min = "0" + min;
  }
  // 秒
  var s = value.getSeconds();
  if (s < 10) {
      s = "0" + s;
  }

  var ms=value.getMilliseconds();

  var result = year + "-" + month + "-" + date;
  if (format == "date") {
      return result;
  } else if (format == "datetime") {
      return result + " " + hours + ":" + min + ":" + s;
  }else if(format=='datetimems'){
      return result + " " + hours + ":" + min + ":" + s+"."+ms;
  } else {
      try {
          return format.replace("yyyy", year).replace("MM", month)
                  .replace("dd", date).replace("hh", hours).replace("mm",
                          min).replace("ss", s).replace("SSS", ms);
      } catch (e) {
          throw new Error(e);
      }
  }
}
