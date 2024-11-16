import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriveSessionManager = () => {

  useEffect(() => {
    // Use setInterval to run processQueue every 10 seconds (10000 ms)
    const intervalId = setInterval(processQueue, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const processQueue = async () => {
    let queuedSessions = JSON.parse(await AsyncStorage.getItem('driveSessionsQueue')) || [];
    const sessionsToKeep = [];

    for (const session of queuedSessions) {
      try {
        const response = await fetch('http://YOUR_IP_ADDRESS:5000/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        // On error, keep the remaining sessions and exit the loop
        sessionsToKeep.push(session, ...queuedSessions.slice(queuedSessions.indexOf(session) + 1));
        break;
      }
    }

    await AsyncStorage.setItem('driveSessionsQueue', JSON.stringify(sessionsToKeep));
  };

  return null;
};

export default DriveSessionManager;

