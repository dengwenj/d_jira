import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'

import AuthProvider from './auth-context'
import { store } from 'store'

export interface ReactChildren {
  children: ReactNode
}

export default function  AppProviders({ children }: ReactChildren) {
  return (
    <Provider store={store}>
      {/* 这个 AuthProvider 比 App 还要大 */}
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider> 
          {children} 
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
