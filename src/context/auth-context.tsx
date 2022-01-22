import React, { createContext, useState } from "react"

import * as auth from 'auth-provider'
import { ILoginParam } from 'srceens/login'
import { IUser } from "srceens/project-list/search"
import { ReactChildren } from './index'

interface ContextValue {
  login: (form: ILoginParam) => Promise<void>
  register: (form: ILoginParam) => Promise<void>
  loginOut: () => Promise<void>
  user: IUser | null
}
 
export const authContext = createContext<ContextValue | undefined>(undefined)

export default function AuthProvider({ children }: ReactChildren) {
  const [user, setUser] = useState<IUser | null>(null)

  const login = async (form: ILoginParam) => {
    const res = await auth.handleLogin(form)
    setUser(res)
  }

  const register = async (form: ILoginParam) => {
    const res = await auth.handleRegister(form)
    setUser(res)
  }

  const loginOut = () => auth.loginOut().then(() => setUser(null))

  return  <authContext.Provider children={children} value={{ login, register, loginOut, user }} />
}


