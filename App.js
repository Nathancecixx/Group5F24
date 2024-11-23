import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/Components/AppNavigator.js';
import SessionManager from './src/Components/SessionManager';

export default function App() {
  return (
    <PaperProvider>
      <SessionManager />
      <AppNavigator />
    </PaperProvider>
  );
}
