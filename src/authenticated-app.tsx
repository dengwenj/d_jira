import React from 'react'

import Index from 'srceens/project-list'
import { useAuth } from 'hooks/useAuth'

// 登录的状态
export default function AuthenticatedApp() {
  const { loginOut } = useAuth()

  return (
    <>
      <button onClick={loginOut}>登出</button>
      <Index />
    </>
  )
}
