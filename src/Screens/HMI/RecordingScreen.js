import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { globalStyles, colors } from '../../Styles/StyleSheet';

import SessionRecorder from '../../Components/SessionRecorder';

const RecordingScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(true);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  };

  const pauseRecording = () => {
    setPaused(true);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    console.log('Stopped recording driving data');
  };

  const resumeRecording = () => {
    setPaused(false);
    startTimer();
    console.log('Started recording driving data');
  };

  const finalizeRecording = () => {
    setRecording(false);
    setPaused(false);
    console.log('Saved recording driving data');
    navigation.navigate('TripResultScreen');
  };


  useEffect(() => {
    startTimer();
  }, []);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };



  return (
    <View style={globalStyles.container}>
      <SessionRecorder recording={recording} />

      {paused ? (
        <>
          <Text style={globalStyles.statusText}>Paused Recording.</Text>
          <Text style={globalStyles.statusText}>{formatTime(seconds)}</Text>
          <Button mode="contained" onPress={resumeRecording} style={globalStyles.button}>
            Resume Recording
          </Button>
          <Button mode="contained" onPress={finalizeRecording} style={globalStyles.button}>
            Finish Drive
          </Button>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={globalStyles.statusText}>Recording your driving data...</Text>
          <Text style={globalStyles.statusText}>{formatTime(seconds)}</Text>
          <Button mode="contained" onPress={pauseRecording} style={globalStyles.button}>
            Pause Recording
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
