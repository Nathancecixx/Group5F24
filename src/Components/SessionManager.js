import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';

const DriveSessionManager = () => {

  useEffect(() => {
    // Use setInterval to run processQueue every 10 seconds (10000 ms)
    const intervalId = setInterval(processQueue, 10000);
    return () => clearInterval(intervalId);
  }, []);


// Function to be called periodically and attempt 
//to send all queued sessions to backend
  const processQueue = async () => {
    // Get the JWT token from AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No JWT token found. Cannot process the queue.');
      return;
    }

    let queuedSessions = JSON.parse(await AsyncStorage.getItem('driveSessionsQueue')) || [];
    const sessionsToKeep = [];

    for (const session of queuedSessions) {
      try {
        const response = await fetch(`${BACKEND_IP}/upload-session`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include JWT
          },
          body: JSON.stringify(session),
        });

        if (response.ok) {
          console.log('Drive session sent successfully');
        } else {
          console.log('Failed to send drive session');
          // Keep the session to retry later
          sessionsToKeep.push(session);
        }
      } catch (error) {
        console.error('Error sending drive session:', error);
        sessionsToKeep.push(session);
      }
    }


    await AsyncStorage.setItem('driveSessionsQueue', JSON.stringify(sessionsToKeep));
  };

  return null;
};

export default DriveSessionManager;

