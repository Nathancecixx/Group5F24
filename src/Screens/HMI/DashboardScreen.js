import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { globalStyles, colors } from '../../Styles/StyleSheet';


const DashboardScreen = ({ navigation }) => {
  // Placeholder data
  const stats = [
    { title: 'Total Miles', value: '1200' },
    { title: 'Trips', value: '150' },
    { title: 'Average Speed', value: '65 MPH' },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.header}>Your Driving Stats</Text>
      {stats.map((stat, index) => (
        <Card key={index} style={globalStyles.card}>
          <Card.Content style={globalStyles.statCardContent}>
            <Title>{stat.title}</Title>
            <Paragraph>{stat.value}</Paragraph>
          </Card.Content>
        </Card>
      ))}

      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('CognitiveTest')}
        style={globalStyles.button}
      >
        <Text> Start Drive </Text>
      </Button>
    </ScrollView>
  );
};

export default DashboardScreen;
