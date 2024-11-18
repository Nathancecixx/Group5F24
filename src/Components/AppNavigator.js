import React from 'react';

import { Button, Text, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../Screens/HMI/DashboardScreen';
import RecordingScreen from '../Screens/HMI/RecordingScreen';
import TripResultScreen from '../Screens/HMI/TripResultScreen';
import CognitiveTestScreen from '../Screens/DriveTests/CognitiveTestScreen';
import RegistrationForm from '../Screens/Authentication/RegistrationForm';
import LoginScreen from '../Screens/Authentication/LoginScreen';

import { colors } from '../Styles/StyleSheet';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Registration"
          component={RegistrationForm}
          options={{
            title: '',
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: 'Dashboard',
            headerLeft: () => null, // This hides the back button
            headerRight: () => (
              <Button
                onPress={() => {
                  Alert.alert('Successfully Logged Out.');
                  navigation.navigate('Login');
                }}
                title="Logout"
                color={colors.error}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CognitiveTest"
          component={CognitiveTestScreen}
          options={{
            title: 'CognitiveTest', 
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            title: 'Recording', 
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="TripResultScreen"
          component={TripResultScreen}
          options={{
            title: 'Trip Results', 
            headerLeft: () => null, // This hides the back button
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
