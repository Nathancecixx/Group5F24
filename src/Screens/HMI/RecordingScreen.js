import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { globalStyles, colors } from '../../Styles/StyleSheet';

const RecordingScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(true);

  const stopRecording = () => {
    setRecording(false);
    console.log('Stopped recording driving data');
  };


  const startRecording = () => {
    setRecording(true);
    console.log('Started recording driving data');
  };

  const finalizeRecording = () => {
    setRecording(false);
    console.log('Saved recording driving data');
  };

    if(!recording){
        return(
        <View style={globalStyles.container}>
             <Text style={globalStyles.statusText}>Paused Recording.</Text> 
            <Button 
                mode="contained" 
                onPress={startRecording} 
                style={globalStyles.button}
            >
                Start Recording
            </Button>
            <Button 
                mode="contained" 
                onPress={finalizeRecording} 
                style={globalStyles.button}
            >
                Finish Drive
            </Button>       
        </View>
        )
    }

  return (
    <View style={globalStyles.container}>
      <ActivityIndicator size="large" color="#1E90FF" />
      <Text style={globalStyles.statusText}>Recording your driving data...</Text>
      <Button 
        mode="contained" 
        onPress={stopRecording} 
        style={globalStyles.button}
      >
        Stop Recording
      </Button>
            <Button 
                mode="contained" 
                onPress={finalizeRecording} 
                style={globalStyles.button}
            >
                Finish Drive
            </Button>
    </View>
  );
};

export default RecordingScreen;
