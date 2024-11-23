import { StyleSheet } from 'react-native';

// Define color palette
export const colors = {
  primary: '#4885ED', // Vivid Blue
  secondary: '#9E6FEF', // Bright Purple for accents
  background: '#FFFFFF', // White background
  backgroundAccent: '#F0F4FF', // Soft blue
  textPrimary: '#2B2B2B', // Dark gray for primary text
  textSecondary: '#666666', // Lighter gray for secondary text
  success: '#28a745', // Green for success messages or indicators
  error: '#dc3545', // Red for errors
  warning: '#ffc107', // Yellow for warnings
  inputBackground: '#A8E6CF', // Muted Aqua for input fields
  buttonHover: '#3778C2', // Slightly darker blue for button hover
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
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
    width: 300,
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
  centeredContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkmarkIcon: {
    fontSize: 150,
    color: colors.success,
    marginBottom: 30,
  },
  successMessage: {
    fontSize: 32,
    color: colors.success,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
//AppNavigator
  logoutButton: {
    marginRight: 15,
    padding: 10,
  },
});

export default { colors, globalStyles };

