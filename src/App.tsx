import React from 'react'
import { Button } from 'antd'

import { useAuth } from 'hooks/useAuth'
import AuthenticatedApp from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'

function App() {
  const { user } = useAuth()

  return (
    <>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}

export default App;
