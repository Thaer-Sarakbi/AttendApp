import React from 'react';
import AppContainer from './src/AppContainer';
import { AuthProvider } from './src/context/AuthProvider';

const App = (props) => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  )
}

export default App