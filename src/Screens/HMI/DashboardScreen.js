import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, ImageBackground } from 'react-native';
import { Text, Card, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [recentSession, setRecentSession] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch both user stats and recent session
  const fetchUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No JWT token found.');
        return;
      }

      // Fetching the general user stats
      const statsResponse = await fetch(`${BACKEND_IP}/get-user-stats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        },
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (
          typeof statsData.totalDistance === 'number' &&
          typeof statsData.totalSessions === 'number' &&
          typeof statsData.averageSpeed === 'number' &&
          typeof statsData.totalDrivingScore === 'number'
        ) {
          const formattedStats = [
            { title: 'Total Distance', value: `${statsData.totalDistance.toFixed(2)} km` },
            { title: 'Total Trips', value: statsData.totalSessions },
            { title: 'Average Speed', value: `${statsData.averageSpeed.toFixed(2)} km/h` },
            { title: 'Driving Score', value: statsData.totalDrivingScore.toFixed(2) },
          ];
          setStats(formattedStats);
        }
      }

      // Fetching the most recent session data
      const recentSessionResponse = await fetch(`${BACKEND_IP}/get-recent-session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        },
      });

      if (recentSessionResponse.ok) {
        const sessionData = await recentSessionResponse.json();
        setRecentSession({
          startTime: new Date(sessionData.startTime).toLocaleString(),
          endTime: new Date(sessionData.endTime).toLocaleString(),
          distance: `${sessionData.totalDistance.toFixed(2)} km`,
          averageSpeed: `${sessionData.averageSpeed.toFixed(2)} km/h`,
          drivingScore: sessionData.sessionDrivingScore.toFixed(2),
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserStats().then(() => setRefreshing(false));
  };

  const startRandomTest = () => {
    const testScreens = ['CognitiveTest', 'MathTest', 'ColorTest'];
    const randomTest = testScreens[Math.floor(Math.random() * testScreens.length)];
    navigation.navigate(randomTest);
  };

  return (
    <ImageBackground
      source={require("../../../assets/Auth_Background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#00C8F8']}
            />
          }
        >
          <Text style={styles.header}>Your Driving Stats</Text>

          {/* Displaying general stats */}
          {stats ? (
            stats.map((stat, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{stat.title}</Text>
                  <Paragraph style={styles.cardValue}>{stat.value}</Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <ActivityIndicator animating={true} color="#00C8F8" size="large" style={styles.loader} />
          )}

          {/* Displaying most recent session */}
          {recentSession ? (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle}>Most Recent Session</Text>
                <Paragraph style={styles.cardValue}>Start: {recentSession.startTime}</Paragraph>
                <Paragraph style={styles.cardValue}>End: {recentSession.endTime}</Paragraph>
                <Paragraph style={styles.cardValue}>Distance Travelled: {recentSession.distance}</Paragraph>
                <Paragraph style={styles.cardValue}>Average Speed: {recentSession.averageSpeed}</Paragraph>
                <Paragraph style={styles.cardValue}>Driving Score: {recentSession.drivingScore}</Paragraph>
              </Card.Content>
            </Card>
          ) : (
            <ActivityIndicator animating={true} color="#00C8F8" size="large" style={styles.loader} />
          )}

          <Button 
            mode="contained"
            onPress={startRandomTest}
            style={styles.startButton}
            labelStyle={styles.startButtonLabel}
          >
            Start Drive
          </Button>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
    justifyContent: 'center', // Center content vertically
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(241, 243, 246, 0.3)', // Transparent white overlay for readability
    padding: 20,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    paddingVertical: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  loader: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  startButton: {
    marginTop: 30,
    width: '100%',
    borderRadius: 20,
    paddingVertical: 12,
    backgroundColor: '#00C8F8',
  },
  startButtonLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default DashboardScreen;
