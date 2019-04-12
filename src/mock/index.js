import Mock from 'mockjs';
Mock.mock('jfcloud/jf-cloud-platform/platform/security/app/page','post',function(){
    return {code:11};
});