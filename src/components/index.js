import JFGrid from './grid/JFGrid.vue';
import JFDelete from './deleteConfirm/JFDelete.vue';

const jfviews={
    JFGrid,
    JFDelete
};

const install=function(Vue){
    Object.keys(jfviews).forEach(key => {
        Vue.component(key, jfviews[key]);
    });
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {jfviews,install};