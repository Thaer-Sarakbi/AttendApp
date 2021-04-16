import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from '../screens/LoginScreens'
import SignupScreen from '../screens/SignupScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

const AuthStack = ({ navigation }) => {
  const AuthStack = createStackNavigator()

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='SignInScreen' component={LoginScreens} options={{header: () => null}}/>
      <AuthStack.Screen 
        name='SignUpScreen' 
        component={SignupScreen} 
        options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('SignInScreen')}
                />
              </View>
            ),
          })}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStack