import qs from 'qs'

import { loginOut } from 'auth-provider'

const api = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  data?: {}
  token?: string 
}

export const http = async (endpoint: string, { data, token, headers, ...args }: Config) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...args
  }

  // 是否为 get 为 get 直接在地址栏中展示
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  const response = await fetch(`${api}/${endpoint}`, config)
  // 为 401 表示未登录，token 失效的情况，就退出登录
  if (response.status === 401) {
    loginOut()
    window.location.reload()
    return Promise.reject({ message: '请重新登录' })
  }

  // 当服务端返回异常的时候 fetch api 并不会抛出异常，要手动抛出。 axios 会抛出异常
  const res = await response.json()
  if (response.ok) {
    return res
  } else {
    return Promise.reject(res)
  } 
}