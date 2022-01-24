import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

import AuthProvider from './auth-context'

export interface ReactChildren {
  children: ReactNode
}

export default function  AppProviders({ children }: ReactChildren) {
  return (
    // 这个 AuthProvider 比 App 还要大
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider> 
        {children} 
      </AuthProvider>
    </QueryClientProvider>

    
  )
}
