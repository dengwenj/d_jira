import { IUser } from "srceens/project-list/search"
import { login, register } from 'api/hh';

const __AUTH_PROVIDER_TOKEN__ = '__auth_provider_token__'

interface User { 
  user: IUser
}

interface IData { 
  username: string,
  password: string 
}

// 这个模块在 context 文件夹里面用的

export const getToken = () => localStorage.getItem(__AUTH_PROVIDER_TOKEN__)
 
export const handleUserResponse = ({ user }: User) => {
  localStorage.setItem(__AUTH_PROVIDER_TOKEN__, user.token || '')
  return user
}

export const handleLogin = async (data: IData) => {
  try {
    const res = await login(data)
    return handleUserResponse(res.data)
  } catch (error) {
    Promise.reject(error).then(() => {}, (res) => {
      console.log(res.response.data.message);
    })
    
    return Promise.reject(error)
  }
  
}

export const handleRegister = async (data: IData) => {
  const res = await register(data)
  return handleUserResponse(res.data)
}

export const loginOut = async () => localStorage.removeItem(__AUTH_PROVIDER_TOKEN__)
