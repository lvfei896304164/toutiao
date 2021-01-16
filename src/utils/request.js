import axios from 'axios';
import store from '@/store';
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
});
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 请求发起会经过这里
    // config 配置对象
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // console.log(config);
    // 注意这里务必要返回config配置对象否则请求就停在这里就出不去了
    return config;
  },
  function (error) {
    // Do something with request error
    // 请求出错了还没有发出去会经过这里
    return Promise.reject(error);
  }
);
// 响应拦截器
export default request;
