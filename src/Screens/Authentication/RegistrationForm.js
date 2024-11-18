import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../../Styles/StyleSheet';

const RegistrationForm = ({ navigation }) => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle registration validation
  const handleRegister = () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      setSuccess('');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      setSuccess('');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setSuccess('');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    // Clear error and set success message
    setError('');
    setSuccess('Registration successful!');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>Register</Text>
      
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

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Success Message */}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      {/* Register Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: colors.primary }}>Already have an account? Login</Text>
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

export default RegistrationForm;
