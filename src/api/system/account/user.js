import request from '@/libs/request';
//服务模块
const serviceModule='service.module.user';
//请求url
const serviceUrl='jfcloud/jf-cloud-platform/platform/security/user/';
export default {
  findPage(data){
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'page',
      method:'post',
      data:data
    });
  },
  save(data){
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'save',
      method:'post',
      data:data
    });
  },
  create(data){
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'create',
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
  getUserMap(userIds) {
    return request({
      serviceModule:serviceModule,
      url: serviceUrl+'map',
      method: 'post',
      data:userIds
    });
  }
};