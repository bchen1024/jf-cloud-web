import Locales from '../locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
export default{
    getKey(){
        return 'i18n';
    },
    init(vm){
        // 自动设置语言
        const lang = window.localStorage.getItem('currentLanguage') || 'zh_CN';
        vm.config.lang = lang;

        let i18nCache=window.localStorage.getItem('i18nCache');
        if(i18nCache){
            i18nCache=JSON.parse(i18nCache) || {};
        }else{
            i18nCache={};
        }

        // 多语言配置
        const mergeZH = Object.assign(zhLocale, Locales['zh_CN'],i18nCache['zh_CN']);
        const mergeEN = Object.assign(enLocale, Locales['en_US'],i18nCache['en_US']);
        vm.locale('zh_CN', mergeZH);
        vm.locale('en_US', mergeEN);
    },
    foreachI18n(obj,key,keyStr,i18n){
        if(typeof obj==='object'  || key==null){
            for(var k in obj){
                this.foreachI18n(obj[k],k,keyStr+k+'.',i18n);
            }
        }else{
            i18n[keyStr.substr(0,keyStr.length-1)]=obj;
        }
    },
    parseI18n(){
        var i18nList=[];
        var cnMap={};
        this.foreachI18n(Locales['zh_CN'],null,'',cnMap);

        var enMap={};
        this.foreachI18n(Locales['en_US'],null,'',enMap);

        for(var key in cnMap){
            var i18n={
                i18nKey:key,
                i18nCN:cnMap[key]
            };
            if(enMap[key]){
                i18n['i18nEN']=enMap[key];
                delete enMap[key];
            }
            i18nList.push(i18n);
        }

        for(var k in enMap){
            var i18nEN={
                i18nKey:k,
                i18nEN:enMap[k]
            };
            if(cnMap[k]){
                i18nEN['i18nCN']=cnMap[k];
                delete cnMap[k];
            }
            i18nList.push(i18nEN);
        }
        return i18nList;
    }
};
