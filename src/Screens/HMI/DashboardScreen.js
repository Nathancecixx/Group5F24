import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { globalStyles, colors } from '../../Styles/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserStats = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No JWT token found. Cannot retrieve user data.');
      return;
    }
    const response = await fetch(`${BACKEND_IP}/get-user-stats`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}` // Include JWT
      },
    });

    if (response.ok) {
      const statsData = await response.json();
      // Ensure that statsData contains the expected properties
      if (
        typeof statsData.totalDistance === 'number' &&
        typeof statsData.totalSessions === 'number' &&
        typeof statsData.averageSpeed === 'number' &&
        typeof statsData.totalDrivingScore === 'number'
      ) {
        // Format the stats data for display
        const formattedStats = [
          { title: 'Total Distance', value: `${statsData.totalDistance.toFixed(2)} km` },
          { title: 'Trips', value: statsData.totalSessions },
          { title: 'Average Speed', value: `${statsData.averageSpeed.toFixed(2)} km/h` },
          { title: 'Total Driving Score', value: statsData.totalDrivingScore.toFixed(2) },
        ];

        setStats(formattedStats); // Update the state with fetched stats
      } else {
        console.error('Unexpected stats data format:', statsData);
      }
    } else {
      console.error('Failed to fetch user stats:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user stats:', error);
  }
};

  useEffect(() => {
    fetchUserStats(); // Call the function when component mounts
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserStats().then(() => setRefreshing(false));
  };

  const startRandomTest = () => {
    const testScreens = ['CognitiveTest', 'MathTest', 'ColorTest'];
    const randomTest = testScreens[Math.floor(Math.random() * testScreens.length)];

    // Debug: Log the test screen chosen
    console.log("Navigating to test screen:", randomTest);

    navigation.navigate(randomTest); // Navigate to the randomly selected screen
  };

  return (
    <ScrollView
      contentContainerStyle={globalStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={globalStyles.header}>Your Driving Stats</Text>
      {stats ? (
        stats.map((stat, index) => (
          <Card key={index} style={globalStyles.card}>
            <Card.Content style={globalStyles.statCardContent}>
              <Title>{stat.title}</Title>
              <Paragraph>{stat.value}</Paragraph>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>Loading stats...</Text>
      )}

      <Button 
        mode="outlined"
        onPress={startRandomTest}
        style={globalStyles.button}
      >
        <Text> Start Drive </Text>
      </Button>
    </ScrollView>
  );
};

export default DashboardScreen;

