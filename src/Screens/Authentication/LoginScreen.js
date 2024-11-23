import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { globalStyles, colors } from '../../Styles/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('All fields are required');
      setSuccess('');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_IP}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem('userToken', data.token);
        setSuccess('Success!');
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Registration Failed', data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.log(err);
    }
  };

  return (
    <View style={styles.background}>
      <Image
        source={require("../../../assets/Auth_Background.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerText}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Success Message */}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Navigate to Registration */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Registration')}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 275,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderRadius: 30,
    marginTop: -30, // Makes the container overlay the image
    alignItems: 'center',
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row', // Arrange icon and TextInput side by side
    alignItems: 'center',
    backgroundColor: colors.backgroundAccent,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1, // Take up the remaining space
    padding: 10,
    color: colors.textPrimary,
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: colors.success,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkText: {
    color: colors.secondary,
    fontSize: 14,
  },
});

export default LoginPage;

