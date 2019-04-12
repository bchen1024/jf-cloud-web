import JFGrid from './grid';
import JFLanguage from './language';
import JFPerson from './person';
import JFToolbar from './toolbar';
import JFError from './error';
import JFForm from './form';

const jfviews={
    JFGrid,
    JFLanguage,
    JFPerson,
    JFToolbar,
    JFError,
    JFForm
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