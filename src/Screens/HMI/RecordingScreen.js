import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { globalStyles, colors } from '../../Styles/StyleSheet';

import SessionRecorder from '../../Components/SessionRecorder';

const RecordingScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(true);
  const [paused, setPaused] = useState(false);


  const pauseRecording = () => {
    setPaused(true);
    console.log('Stopped recording driving data');
  };


  const resumeRecording = () => {
    setPaused(false);
    console.log('Started recording driving data');
  };

  const finalizeRecording = () => {
    setRecording(false);
    setPaused(false);
    console.log('Saved recording driving data');
    navigation.navigate('TripResultScreen');
  };



  return (
    <View style={globalStyles.container}>
      <SessionRecorder recording={recording} />

      {paused ? (
        <>
          <Text style={globalStyles.statusText}>Paused Recording.</Text>
          <Button mode="contained" onPress={resumeRecording} style={globalStyles.button}>
            Start Recording
          </Button>
          <Button mode="contained" onPress={finalizeRecording} style={globalStyles.button}>
            Finish Drive
          </Button>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={globalStyles.statusText}>Recording your driving data...</Text>
          <Button mode="contained" onPress={pauseRecording} style={globalStyles.button}>
            Stop Recording
          </Button>
          <Button mode="contained" onPress={finalizeRecording} style={globalStyles.button}>
            Finish Drive
          </Button>
        </>
      )}
    </View>
  );


};

export default RecordingScreen;
