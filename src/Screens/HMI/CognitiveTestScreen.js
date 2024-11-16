import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const CognitiveTestScreen = ({ navigation }) => {
    const [isBlinking, setIsBlinking] = useState(true); 
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [testStarted, setTestStarted] = useState(false);
    const [testFinished, setTestFinished] = useState(false);
    const [buttonColor, setButtonColor] = useState('red'); 
    const [buttonText, setButtonText] = useState('Start Test'); 
    const [canPress, setCanPress] = useState(false); 

   
    const startReactionTest = () => {
        setStartTime(new Date().getTime()); 
        setButtonText(''); 
        setTestStarted(true); 
        setIsBlinking(true); 
        setButtonColor('red'); 
        console.log("Test started, blinking red...");
    };


    const handleButtonPress = () => {
        console.log("Button pressed!");
        if (canPress && !testFinished) {
            const endTime = new Date().getTime();
            const reactionTimeInMillis = endTime - startTime;
            setReactionTime(reactionTimeInMillis);
            setTestFinished(true); 
            console.log("Test finished, reaction time:", reactionTimeInMillis); 
        }
    };


    useEffect(() => {
        if (isBlinking && !testFinished) {
            const blinkInterval = setInterval(() => {
                setIsBlinking(prevState => !prevState); 
            }, 500); 

            return () => clearInterval(blinkInterval); 
        }
    }, [isBlinking, testFinished]);


    useEffect(() => {
        if (testStarted && !testFinished) {
            const delay = Math.random() * 3000 + 2000; 
            console.log("Starting delay for button stop blinking (Delay: " + delay + "ms)"); 
            const timer = setTimeout(() => {
                setIsBlinking(false); 
                setButtonColor('green'); 
                setCanPress(true); 
                console.log("Button turned green, wait for user press");
            }, delay);
            return () => clearTimeout(timer); 
        }
    }, [testStarted, testFinished]);

    
    useEffect(() => {
        if (testFinished) {
            console.log("Test Finished. Reaction Time:", reactionTime); 
            if (reactionTime < 5000) { 
                Alert.alert("Good reaction time! You can now start your drive.");
            } else {
                Alert.alert("Warning", "Your reaction time is too slow. It is not safe to drive.");
            }

            
            navigation.navigate('Recording');  
        }
    }, [testFinished, reactionTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cognitive Reaction Test</Text>
            <Text style={styles.instructions}>
                {testStarted ? "Press the button once it turns green!" : "Tap the button below to start the test."}
            </Text>

            {/* Show the Start Test Button if the test hasn't started */}
            {!testStarted && (
                <TouchableOpacity style={styles.startTestButton} onPress={startReactionTest}>
                    <Text style={styles.startTestButtonText}>Start Test</Text>
                </TouchableOpacity>
            )}

            {/* Show the Red (blinking) button if the test has started */}
            {testStarted && !testFinished && (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isBlinking ? 'red' : buttonColor }]} 
                    onPress={handleButtonPress}
                    disabled={!canPress}  
                >
                    <Text style={styles.buttonText}>{isBlinking ? "Wait..." : "Press Now"}</Text>
                </TouchableOpacity>
            )}

            {testFinished && (
                <Text style={styles.result}>
                    Your reaction time: {reactionTime} ms
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    instructions: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    startTestButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'red', 
        borderRadius: 5,
        alignItems: 'center',
    },
    startTestButtonText: {
        fontSize: 20,
        color: 'white',
    },
});

export default CognitiveTestScreen;
