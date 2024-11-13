import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/Components/AppNavigator.js';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
