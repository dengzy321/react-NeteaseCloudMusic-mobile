/*
 * @Author: dengzy 
 * @Date: 2019-10-17 11:35:28
 * @last modify Author:  dengzy
 * @last Date: 2019-11-06 15:55:50
   请求接口封装    
 */

import axios from 'axios';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const instance = axios.create({
  //超时时间
  timeout: 3000,
  //响应前处理
  transformResponse: (responseData) => {
    return responseData;
  }
})

// 请求拦截
instance.interceptors.request.use(function (request) {
  // 在发送请求之前做些什么，例如加入token
  return request
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(function (response) {
  const { status, data, headers } = response;
  if (status === 200) {
    return JSON.parse(data)
  }
  else if (status === 301) {
    return response;
  }
  else {
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