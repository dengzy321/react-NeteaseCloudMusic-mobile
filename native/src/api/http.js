import axios from './axios'
import HTTP_URL from './url';

function mapUrlObjToFuncObj(urlObj){
  const http = {};
  Object.keys(urlObj).forEach((key)=>{
    const item = urlObj[key]; 
    http[key]=function(params){
      return axios[item.method](item.url,params,item.option);
    }
  });
  return http;
}

function mapUrlObjToStrObj(urlObj){
  const Url = {};
  Object.keys(urlObj).forEach((key)=>{
    const item = urlObj[key];
    Url[key]=item.url;
  });
  return Url;
}

export const http = mapUrlObjToFuncObj(HTTP_URL);
export const URL = mapUrlObjToStrObj(HTTP_URL);
   