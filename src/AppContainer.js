import React, { useContext, useEffect, useState } from 'react';
import AuthStack from './stacks/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import MainTab from './tabs/MainTab';
import { AuthContext } from './context/AuthContext';

const AppContainer = (props) => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
      { user ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppContainer