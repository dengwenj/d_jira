import axios from "axios"

const api = process.env.REACT_APP_API_URL

// 创建一个axios实例，就是复制一个axios
const request = axios.create({
  baseURL: api
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 任何所有请求都会经过这里
  // config 是当前请求相关的配置信息， config 是可以修改的
  // 统一设置 token

  const token = localStorage.getItem('__auth_provider_token__') // 这里就是存储的 token 不是对象
  console.log(token);
  

  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }   

  // 这样才能去发送请求，不然一直拦截
  return config
})

export default request