// LogoutButtonWithConfirmation.js
import React, { useState } from 'react';
import { View, Button, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "../Styles/StyleSheet";
import { BACKEND_IP } from '@env';

const LogoutButton = ({ navigation }) => {

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: performLogout },
      ],
      { cancelable: true }
    );
  };

  const performLogout = async () => {
    try {
      // Get the user token from storage
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found!');
        return;
      }
      // Send user token to logout route
      const response = await fetch(`${BACKEND_IP}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.removeItem('userToken');
        Alert.alert('Success', 'You have been logged out.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Logout Failed', data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Something went wrong during logout.');
    } 
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Icon name="sign-out" size={30} color={colors.secondary} style={styles.icon}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    alignItems: 'center',
  },
  icon: {
    paddingBottom: 40,
  }
});

export default LogoutButton;

