import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../Styles/StyleSheet'; // Import colors for styling

import RecordingScreen from '../Screens/HMI/RecordingScreen'; // Keep as-is
import RegistrationForm from '../Screens/RegistrationForm'; // Your part

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary }, // Header background for consistency
          headerTintColor: colors.background, // Header text and icons color
          headerTitleStyle: { fontWeight: 'bold' }, // Bold titles for clarity
        }}
      >
        {/* RegistrationForm Screen - Your Part */}
        <Stack.Screen
          name="Registration"
          component={RegistrationForm}
          options={{ title: 'Register' }} // Title for the Registration screen
        />

        {/* RecordingScreen - Leave untouched */}
        <Stack.Screen
          name="Recording"
          component={RecordingScreen} // No changes made
          options={{ title: 'Recording' }} // Keep title as it is
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
