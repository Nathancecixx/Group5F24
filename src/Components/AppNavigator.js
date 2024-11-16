import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../Screens/HMI/DashboardScreen';
import RecordingScreen from '../Screens/HMI/RecordingScreen';
import TripResultScreen from '../Screens/HMI/TripResultScreen';
import CognitiveTestScreen from '../Screens/HMI/CognitiveTestScreen';
import RegistrationForm from '../Screens/RegistrationForm';
import LoginScreen from '../Screens/LoginScreen'; // Import the Login screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration"> {/* Set Registration as the initial route */}
        {/* Registration Screen */}
        <Stack.Screen
          name="Registration"
          component={RegistrationForm}
          options={{
            title: 'Register', // Title for the Registration screen
          }}
        />
        
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login', // Title for the Login screen
          }}
        />
        
        {/* Dashboard Screen */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard', // Title for the Dashboard screen
          }}
        />
        
        {/* Cognitive Test Screen */}
        <Stack.Screen
          name="CognitiveTest"
          component={CognitiveTestScreen}
          options={{
            title: 'Cognitive Test', // Title for the Cognitive Test screen
          }}
        />
        
        {/* Recording Screen */}
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            title: 'Recording', // Title for the Recording screen
          }}
        />
        
        {/* Trip Results Screen */}
        <Stack.Screen
          name="TripResultScreen"
          component={TripResultScreen}
          options={{
            title: 'Trip Results', // Title for the Trip Results screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
