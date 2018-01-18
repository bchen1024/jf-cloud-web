import menus from './config/menus/index.js';
const indexRouters = [];
for(var name in menus){
    var menu=menus[name];
    if(menu.component){
        indexRouters.push({
            name:name,
            path:menu.path,
            component: menu.component,
            meta:{title:menu.title}
        });
    }
}
const routers = [
    {name:'index',path: '/',meta: {title: ''},component: (resolve) => require(['./views/index.vue'], resolve),
        children:indexRouters
    }
];
export default routers;