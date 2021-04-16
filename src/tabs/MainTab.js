import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Icon from 'react-native-vector-icons/Ionicons'
import TableStack from '../stacks/TableStack';

const MainTab = (props) => {
    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#fff',
          inactiveBackgroundColor: '#FF5722',
          activeBackgroundColor: '#FF8A65',
        }}
      >
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color, size }) => (
              <Icon name="scan-circle-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Table"
          component={TableStack}
          options={{
            tabBarLabel: 'Table',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    )
}

export default MainTab