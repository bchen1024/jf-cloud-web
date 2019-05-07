import Mock from 'mockjs';
import Config from '@/config/config.js';
Mock.mock(Config.serviceUrl+'jfcloud/jf-cloud-platform/platform/auth/login','post',function(){
    return {httpCode:200,data:{
        user:{userId:2,userName:'陈斌',userAccount:'chenbin'},
        token:'dsfjlsjflsdjljkjdlsf'
    }};
});
Mock.mock(Config.serviceUrl+'jfcloud/jf-cloud-platform/platform/security/user/current','post',function(){
    return {httpCode:200,data:{
        user:{userId:2,userName:'陈斌',userAccount:'chenbin'}
    }};
});
Mock.mock(Config.serviceUrl+'jfcloud/jf-cloud-platform/platform/security/user/page','post',function(){
    return {httpCode:200,data:{
        result:[{userId:2,userName:'陈斌',userAccount:'chenbin'}],
        pageVO:{pageSize:10,curPage:1,total:1,totalPage:1}
    }};
});
export default Mock;