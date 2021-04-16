import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ExploreScreen from '../screens/ExploreScreen';
import MapScreen from '../screens/MapScreen';

const TableStack = ({ navigation }) => {
  const TableStack = createStackNavigator();
 
  return (
    <TableStack.Navigator screenOptions={{
        headerStyle: { 
          backgroundColor: '#fff',
          //shadowColor: '#fff',  //ios
          elevation: 0   //android
        }, 
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
      > 
          <TableStack.Screen 
            name="Table" 
            component={ExploreScreen} 
            options={{
              headerTransparent: true,
              headerTitle: false
            }}
          />
          <TableStack.Screen 
            name="MapScreen" 
            component={MapScreen} 
            options={({ route }) => ({
              //title: route.params.title,
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTintColor: '#fff' 
            })}
          />
        </TableStack.Navigator>
  )
}

export default TableStack