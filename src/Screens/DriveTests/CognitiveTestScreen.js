import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const CognitiveTestScreen = ({ navigation }) => {
    const [isBlinking, setIsBlinking] = useState(true);
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [testStarted, setTestStarted] = useState(false);
    const [testFinished, setTestFinished] = useState(false);
    const [buttonColor, setButtonColor] = useState('red');
    const [message, setMessage] = useState("Tap the button below to start the test.");
    const [canPress, setCanPress] = useState(false);

    const startReactionTest = () => {
        setStartTime(new Date().getTime());
        setTestStarted(true);
        setIsBlinking(true);
        setButtonColor('red');
        setMessage("Wait for the button to turn green...");
    };

    const handleButtonPress = () => {
        if (canPress && !testFinished) {
            const endTime = new Date().getTime();
            const reactionTimeInMillis = endTime - startTime;
            setReactionTime(reactionTimeInMillis);
            setTestFinished(true);
            setMessage(`Your reaction time: ${reactionTimeInMillis} ms`);
        }
    };

    useEffect(() => {
        if (isBlinking && !testFinished) {
            const blinkInterval = setInterval(() => {
                setIsBlinking((prevState) => !prevState);
            }, 500);

            return () => clearInterval(blinkInterval);
        }
    }, [isBlinking, testFinished]);

    useEffect(() => {
        if (testStarted && !testFinished) {
            const delay = Math.random() * 3000 + 2000;
            const timer = setTimeout(() => {
                setIsBlinking(false);
                setButtonColor('green');
                setCanPress(true);
                setMessage("Press the button now!");
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [testStarted, testFinished]);

    useEffect(() => {
        if (testFinished) {
            if (reactionTime < 5000) {
                Alert.alert("Good reaction time! You can now start your drive.");
                navigation.navigate('Recording');
            } else {
                Alert.alert("Warning", "Your reaction time is too slow. It is not safe to drive.");
                navigation.navigate('Dashboard');
            }
        }
    }, [testFinished, reactionTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>{message}</Text>

            {testStarted && !testFinished && (
                <TouchableOpacity
                    style={[styles.circularButton, { backgroundColor: isBlinking ? 'red' : buttonColor }]}
                    onPress={handleButtonPress}
                    disabled={!canPress}
                />
            )}

            {!testStarted && (
                <TouchableOpacity style={styles.startButton} onPress={startReactionTest}>
                    <Text style={styles.startButtonText}>Start Test</Text>
                </TouchableOpacity>
            )}

            {testFinished && (
                <Text style={styles.result}>Your reaction time: {reactionTime} ms</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    circularButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    startButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    startButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    result: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CognitiveTestScreen;

