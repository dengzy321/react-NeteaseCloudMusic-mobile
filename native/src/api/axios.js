/*
 * @Author: dengzy 
 * @Date: 2019-10-17 11:35:28
 * @last modify Author:  
 * @last Date: 
   请求借口封装    
 */
import axios from 'axios';

const instance = axios.create({
  //超时时间
  timeout: 3000,
  //响应前处理
  transformResponse: (responseData) => {
    return responseData;
  }
})

//响应拦截
instance.interceptors.response.use(function (response) {
  const { status, data, statusText, headers } = response;
  if (status === 200) {
    return headers['content-type'] === 'application/json' ? JSON.parse(data) : JSON.parse(data);
  } else if (status === 401) {
    //跳转登录
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  get: (url, params, option) => {
    return instance.get(url, Object.assign({}, option, { params }));
  },
  post: (url, params, option) => {
    return instance.post(url, params, option);
  },
  delete: (url, params, option) => {
    return instance.delete(url, Object.assign({}, option, { params }));
  }
}