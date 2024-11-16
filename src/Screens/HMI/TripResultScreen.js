// TripRecordedScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { globalStyles } from '../../Styles/StyleSheet';

const TripResultScreen = ({ navigation }) => {

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.sequence([
      Animated.delay(300),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 1,
        useNativeDriver: true,
      }),
    ]).start();

    // Set a timer to navigate back to Dashboard after 1.5 seconds
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }, 1500);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <View style={globalStyles.centeredContainer}>
      <Animated.Text
        style={[
          globalStyles.checkmarkIcon,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        ✓
      </Animated.Text>
      <Text style={globalStyles.successMessage}>Trip Recorded</Text>
    </View>
  );
};

export default TripResultScreen;

