import { useContext } from "react"

import { authContext } from "context/auth-context" 

// 全局的，想在哪里用就在哪里用
export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 组件中使用')
  }

  return context
}
