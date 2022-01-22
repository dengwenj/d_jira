import React, { ReactNode } from 'react';

import AuthProvider from './auth-context'

export interface ReactChildren {
  children: ReactNode
}

export default function  AppProviders({ children }: ReactChildren) {
  return (
    // 这个 AuthProvider 比 App 还要大
    <AuthProvider> 
      {children} 
    </AuthProvider>
  )
}
