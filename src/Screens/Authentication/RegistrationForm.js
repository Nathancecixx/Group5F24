import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { globalStyles, colors } from '../../Styles/StyleSheet';
import { BACKEND_IP } from '@env';

const RegistrationForm = ({ navigation }) => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle registration validation
const handleRegister = async () => {
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

  try {
    const response = await fetch(`${BACKEND_IP}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ email, password, }),
    });

    const data = await response.json();

    if (response.ok) {
      setError('');
      setSuccess(data.message);
      navigation.navigate('Login');
    } else {
      setError(data.error || 'Something went wrong');
      setSuccess('');
    }
  } catch (err) {
    setError('Failed to connect to the server');
    setSuccess('');
  }
};


  return (
    <View style={styles.background}>
      <Image
        source={require("../../../assets/Auth_Background.png")}
        style={styles.image}
      />
        <View style={styles.container}>
          <Text style={styles.headerText}>Register</Text>
          
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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Success Message */}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Navigate to Login */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.linkText}>Already have an account? Login</Text>
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
    marginTop: -30, 
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
    flexDirection: 'row',
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
    flex: 1,
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

export default RegistrationForm;
