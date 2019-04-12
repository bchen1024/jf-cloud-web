import request from '@/libs/request';
//服务模块
const serviceModule='service.module.i18n';
//请求url
const serviceUrl='jfcloud/jf-cloud-platform/platform/';
export default{
  /**
   * 登录系统
   * @param {*} data 
  */
  login(data){
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'auth/login',
      method:'post',
      data:data
    });
  },
  /**
   * 获取当前信息
   */
  getCurrent() {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'current',
      method: 'post'
    });
  }
};