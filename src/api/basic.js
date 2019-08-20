import axios from 'axios';

const http = axios.create();

http.interceptors.request.use(function (config) {
  document.cookie = 'saas_login_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBUFAiLCJ1c2VyX2lkIjoiNWNmMDkzNmI5MDA1NjcwZmRkNzdkODQxOjVjZjA5M2E1OTAwNTY3MGZkZDc3ZGE4OToxODkxMTIxMjc3NSIsImlzcyI6IkppbmdkYXRhIiwiZXhwIjoxNTY2NTMyNzA1LCJpYXQiOjE1NjU2Njg3MDV9.jCVjy1cr_r7Y7BrEjPX23tgfuVk1XJL7Iqvjo0UFQNw'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default async function ajax(config) {
  http.defaults.timeout = 40000;
  http.defaults.withCredentials = true 
  http.defaults.baseURL = '/api';
  // http.defaults.headers.common.Cookie = ''
  http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  let results;
  try {
    results = await http.request(config);
  } catch (e) {
    results = e;
  }

  if (!(results instanceof Error)) {
    if (results.status === 200) {
      const { code, message } = results.data;
      switch (code) {
      case 0:
        return results.data.result;
      default:
        console.log(message)
        throw results.data;
      }
    } else {
      throw Error();
    }
  } else {
    throw results;
  }
}
