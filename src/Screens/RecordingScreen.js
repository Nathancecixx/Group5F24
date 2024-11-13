import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';

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

    if(recording){
        return(
        <View style={styles.container}>
             <Text style={styles.statusText}>Paused Recording.</Text> 
            <Button 
                mode="contained" 
                onPress={startRecording} 
                style={styles.button}
            >
                Start Recording
            </Button>       
        </View>
        )
    }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E90FF" />
      <Text style={styles.statusText}>Recording your driving data...</Text>
      <Button 
        mode="contained" 
        onPress={stopRecording} 
        style={styles.button}
      >
        Stop Recording
      </Button>
    </View>
  );
};

export default RecordingScreen;
