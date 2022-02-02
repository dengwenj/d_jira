import React, { createContext } from "react"

import * as auth from 'auth-provider'
import { ILoginParam } from 'srceens/login'
import { IUser } from "types/user"
import { ReactChildren } from './index'
import { http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "hooks/useAsync"
import { SpinLoading, FullPageError } from 'components/lab'

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
  const { data: user, error, isLoading, isError, isIdle, run, setData: setUser } = useAsync<IUser>()

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return  <SpinLoading />
  }

  if (isError) {
    return <FullPageError error={error} />
  }

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


