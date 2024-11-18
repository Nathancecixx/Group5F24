import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../../Styles/StyleSheet';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    setSuccess('Login Successful!');
    setError('');
    navigation.navigate('Dashboard');
    /*try {
      // Mock backend call (replace with real backend integration)
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { message } = await response.json();
        setSuccess('Login successful!');
        setError('');
        // Navigate to the next screen (replace 'Home' with the actual screen name)
        navigation.navigate('Recording');
      } else {
        const { message } = await response.json();
        setError(message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }*/
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Success Message */}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Registration */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: colors.primary }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 5,
    marginBottom: 10,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundAccent,
  },
  headerText: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: colors.success,
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginPage;
