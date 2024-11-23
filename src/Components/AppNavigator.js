import React from 'react';

import { Button, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../Screens/HMI/DashboardScreen';
import RecordingScreen from '../Screens/HMI/RecordingScreen';
import TripResultScreen from '../Screens/HMI/TripResultScreen';
import CognitiveTestScreen from '../Screens/DriveTests/CognitiveTestScreen';
import ColorTestScreen from '../Screens/DriveTests/ColorIdentificationTestScreen';
import MathTestScreen from '../Screens/DriveTests/MathTestScreen';
import RegistrationForm from '../Screens/Authentication/RegistrationForm';
import LoginScreen from '../Screens/Authentication/LoginScreen';

import LogoutButton from './LogoutButton';

import { colors, globalStyles} from '../Styles/StyleSheet';

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
            headerShown: false, // Hides the header
            gestureEnabled: false, // Disable swipe back gesture
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerShown: false, // Hides the header
            gestureEnabled: false, // Disable swipe back gesture
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: '',
            gestureEnabled: false, // Disable swipe back gesture
            headerLeft: () => null, // Hides the back button
            headerRight: () => (<LogoutButton navigation={navigation}/>),
            headerBackground: () => (
              <Image
                source={require("../../assets/Auth_Background.png")}
                style={styles.headerBackground}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CognitiveTest"
          component={CognitiveTestScreen}
          options={{
            title: 'CognitiveTest',
            gestureEnabled: false, // Disable swipe back gesture 
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="ColorTest"
          component={ColorTestScreen}
          options={{
            title: 'ColorTest',
            gestureEnabled: false, // Disable swipe back gesture 
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="MathTest"
          component={MathTestScreen}
          options={{
            title: 'MathTest',
            gestureEnabled: false, // Disable swipe back gesture 
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            title: 'Recording', 
            gestureEnabled: false, // Disable swipe back gesture
            headerLeft: () => null, // This hides the back button
          }}
        />
        <Stack.Screen
          name="TripResultScreen"
          component={TripResultScreen}
          options={{
            title: 'Trip Results', 
            gestureEnabled: false, // Disable swipe back gesture
            headerLeft: () => null, // This hides the back button
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});



export default AppNavigator;
