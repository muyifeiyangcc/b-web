import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { Result } from './type'
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  // 请求前缀
  baseURL: "/api",
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Language': 'en'
  },
});

// 添加请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 添加token参数
  config.headers.loginToken = localStorage.getItem('token') || '5296949AA767440399D6BF6D70E43E06'
  config.headers.appid = localStorage.getItem('appId') || '77985415'
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
});

// 添加响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    // 对响应数据做处理
    //业务错误
    const { code, message, result } = res.data
    if (code === "0000") {
      return result
    }
    else {
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    // 网络错误
    let message = ''
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        break;
      case 403:
        message = '拒绝访问'
        break;
      case 404:
        message = '请求地址错误'
        break;
      case 500:
        message = '服务器故障'
        break;
      default:
        message = '网络连接故障'
    }
    return Promise.reject(error)
  }
);
export default service
//封装公共方法
export const http = {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  }
}

