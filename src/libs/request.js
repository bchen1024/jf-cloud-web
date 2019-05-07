import axios from 'axios';
import {Modal} from 'iview';
import Config from '@/config/config.js';
import {getToken,getCurrentLanguage} from '@/libs/util.js';

// 创建axios实例
const service = axios.create({
  baseURL: Config.serviceUrl, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token = getToken();
    if(token) {
      config.headers['Authorization'] = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['currentLanguage'] = getCurrentLanguage();
    config.headers['appCode'] = Config.appCode;
    if(!config.data){
      config.data={};
    }
    if(!config.data.appCode && config.url.indexOf("/app/page")==-1 && !config.data.removeApp){
      let currentApp=localStorage.getItem("currentApp");
      config.data.appCode=currentApp;
    }
    return config
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = (response.data && response.data.httpCode) || response.status
    if (code < 200 || code > 300) {
      return Promise.reject(response.data)
    } else {
      return response.data.data;
    }
  },
  error => {
    if(error.response){
      Modal.error({
        title: 'Error',
        content: error.response.data.message
      });
      return Promise.reject(error.response.data);
    }else{
      return Promise.reject(error);
    }
  }
);
export default service
