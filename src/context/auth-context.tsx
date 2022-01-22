import React, { createContext, useState } from "react"

import * as auth from 'auth-provider'
import { ILoginParam } from 'srceens/login'
import { IUser } from "srceens/project-list/search"
import { ReactChildren } from './index'
import { http } from "utils/http"
import { useMount } from "utils"

interface ContextValue {
  login: (form: ILoginParam) => Promise<void>
  register: (form: ILoginParam) => Promise<void>
  loginOut: () => Promise<void>
  user: IUser | null
}
 
export const authContext = createContext<ContextValue | undefined>(undefined)

const bootstrapUser = async () => {
  let user = null

  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }

  return user
}

export default function AuthProvider({ children }: ReactChildren) {
  const [user, setUser] = useState<IUser | null>(null)

  useMount(() => {
    bootstrapUser().then((res) => {
      setUser(res)
    })
  })

  const login = async (form: ILoginParam) => {
    const res = await auth.handleLogin(form)
    setUser(res)
  }

  const register = async (form: ILoginParam) => {
    const res = await auth.handleRegister(form)
    setUser(res)
  }

  const loginOut = () => auth.loginOut().then(() => setUser(null))

  // <authContext.Provider> App 组件在这里面 </authContext.Provider>
  return  <authContext.Provider children={children} value={{ login, register, loginOut, user }} />
}


