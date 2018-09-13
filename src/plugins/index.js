
import $JFI18n from './jf.i18n.js';
import $JFFetch from './jf.fetch.js';
import $JFUtil from './jf.util.js';
const plugins={
    $JFI18n,
    $JFFetch,
    $JFUtil
};

const install=function(Vue){
    Object.keys(plugins).forEach(key => {
        Vue.prototype[key]=plugins[key];
    });
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {plugins,install};