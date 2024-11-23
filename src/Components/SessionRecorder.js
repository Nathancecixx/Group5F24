import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionRecorder = ({ recording, paused }) => {
  const [driveSession, setDriveSession] = useState({
    startTime: new Date().toISOString(),
    locations: [],
    totalDistance: 0,
  });

  const locationSubscription = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (recording && !paused) {
      startLocationUpdates();
    } else {
      stopLocationUpdates();
      if (!recording) {
        saveDriveSession();
      }
    }

    // Cleanup when component unmounts
    return () => {
      stopLocationUpdates();
    };
  }, [recording, paused]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance; // Return distance in km
  };


  const startLocationUpdates = async () => {

    // Check if its already running
    if (locationSubscription.current) return;

    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Continuously record the position
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Get updates every second
          distanceInterval: 0, // Get updates even if not moved
        },
        // Callback function as second param
        (location) => {

          // Skip recording data if paused
          if (pausedRef.current) return;

          const { latitude, longitude, speed } = location.coords;
          const newLocation = {
            timestamp: new Date().toISOString(),
            latitude,
            longitude,
            speed,
          };

          // Append onto list of locations
          setDriveSession((prevSession) => {
            const lastLocation = prevSession.locations[prevSession.locations.length - 1];
            let distance = 0;
            if (lastLocation) {
              distance = calculateDistance(
                lastLocation.latitude,
                lastLocation.longitude,
                latitude,
                longitude
              );
          } 

            return {
              ...prevSession,
              locations: [...prevSession.locations, newLocation],
              totalDistance: prevSession.totalDistance + distance,
            };
          });
        }
      );
    } catch (error) {
      console.error('Error starting location updates:', error);
    }
  };

  const stopLocationUpdates = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };

  const saveDriveSession = async () => {
    if (driveSession.locations.length > 0) {
      try {
        const queuedSessions =
          JSON.parse(await AsyncStorage.getItem('driveSessionsQueue')) || [];
        queuedSessions.push(driveSession);
        await AsyncStorage.setItem(
          'driveSessionsQueue',
          JSON.stringify(queuedSessions)
        );
        console.log('Drive session saved:', driveSession);
      } catch (error) {
        console.error('Error saving drive session:', error);
      }
    }

    // Reset session after saving
    setDriveSession({
      startTime: new Date().toISOString(),
      locations: [],
      totalDistance: 0,
    });
  };

  return null;
};

export default SessionRecorder;

