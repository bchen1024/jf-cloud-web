import request from '@/libs/request';
//服务模块
const serviceModule='service.module.i18n';
//请求url
const serviceUrl='jfcloud/jf-cloud-platform/platform/config/i18n/';
export default{
  findPage(data){
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'page',
      method:'post',
      data:data
    });
  },
  batchDelete(data) {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'batch/delete',
      method:'delete',
      data:data
    });
  },
  create(data) {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'create',
      method:'post',
      data:data
    });
  },
  update(data) {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'update',
      method:'put',
      data:data
    });
  }
};