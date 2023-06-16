import axios from 'axios';

// 配置新建一个 axios 实例
const service = axios.create({
  // 请求前缀
  baseURL: "/api",
  timeout: 50000,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Language': 'en',
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 添加token参数
  config.headers.loginToken = '587B8BA94BB74B499EADE5019B792745';
  config.headers.appid = '77985415';
  config.headers.appid = '77985415';
  return config;
});

// 添加响应拦截器
service.interceptors.response.use(
  async (res) => {
    // 对响应数据做处理
    // const res = response.data;
    // if (res.code !== 20000 && res.code !== 200) {
    //   /* 成功数据的code值为20000/200 */
    //   // 统一的错误提示
    //   ElMessage({
    //     message:
    //       (typeof res.data == 'string' && res.data) || res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000,
    //   });

    //   // `token` 过期或者账号已在别处登录
    //   if (response.status === 401) {
    //     const storeUserInfo = useUserInfoStore(pinia);
    //     await storeUserInfo.reset();
    //     window.location.href = '/'; // 去登录页
    //     ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
    //       .then(() => {})
    //       .catch(() => {});
    //   }
    //   return Promise.reject(service.interceptors.response);
    // } else {
    //   return res.data; /* 返回成功响应数据中的data属性数据 */
    // }
    return res.data.result
  },
  (error) => {
    // // 对响应错误做点什么
    // if (error.message.indexOf('timeout') != -1) {
    //   ElMessage.error('网络超时');
    // } else if (error.message == 'Network Error') {
    //   ElMessage.error('网络连接错误');
    // } else {
    //   if (error.response.data) ElMessage.error(error.response.statusText);
    //   else ElMessage.error('接口路径找不到');
    // }
    // return Promise.reject(error);
  }
);

export default service;
