import { StyleSheet } from 'react-native';

// Define color palette
export const colors = {
  primary: '#1E90FF', // Blue for primary buttons and activity indicator
  secondary: '#FF6347', // Tomato color for accents
  background: '#FFFFFF', // White background
  backgroundAccent: '#F5F5F5', // Light gray background for accents
  textPrimary: '#333333', // Dark gray for primary text
  textSecondary: '#666666', // Lighter gray for secondary text
  success: '#28a745', // Green for success messages or indicators
  error: '#dc3545', // Red for errors
  warning: '#ffc107', // Yellow for warnings
};

// Define global styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    padding: 10,
    width: '60%',
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.background,
    textAlign: 'center',
    fontSize: 16,
  },
  activityIndicator: {
    color: colors.primary,
  },
});

export default { colors, globalStyles };

