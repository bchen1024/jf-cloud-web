import request from '@/libs/request';
//服务模块
const serviceModule='service.module.permission';
//请求url
const serviceUrl='jfcloud/jf-cloud-platform/platform/security/permission/';
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
  save(data) {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'save',
      method:'post',
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
  },
  listTree(data) {
    return request({
      serviceModule:serviceModule,
      url:serviceUrl+'list/tree',
      method:'post',
      data:data
    });
  }
};