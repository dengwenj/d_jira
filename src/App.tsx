import React from 'react'

import { useAuth } from 'hooks/useAuth'
import AuthenticatedApp from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'
import ErrorBoundary from 'components/error-boundary'
import { FullPageError } from 'components/lab'

function App() {
  const { user } = useAuth()

  return (
    <>
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
      
    </>
  );
}

export default App;
