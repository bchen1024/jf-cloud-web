import userAppService from './config/userAppService.js';

const services={
    userAppService
};

const install=function(Vue){
    Vue.prototype.$JFServices={};
    Object.keys(services).forEach(key => {
        Vue.prototype.$JFServices[key]=services[key];
    });
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {services,install};