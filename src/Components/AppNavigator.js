import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../Screens/HMI/DashboardScreen';
import RecordingScreen from '../Screens/HMI/RecordingScreen';
import TripResultScreen from '../Screens/HMI/TripResultScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard',
                     headerLeft: () => null, // This hides the back button
                  }}
        />
        <Stack.Screen 
          name="Recording" 
          component={RecordingScreen} 
          options={{ title: 'Recording', 
                     headerLeft: () => null, // This hides the back button
                  }}
        />
        <Stack.Screen 
          name="TripResultScreen" 
          component={TripResultScreen} 
          options={{ title: 'TripResultScreen', 
                     headerLeft: () => null, // This hides the back button
                  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
