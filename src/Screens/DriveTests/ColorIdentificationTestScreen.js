import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ColorIdentificationTestScreen = ({ navigation }) => {
    const [color, setColor] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [testFinished, setTestFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    const colors = [
        { name: 'Red', code: '#FF0000' },
        { name: 'Green', code: '#00FF00' },
        { name: 'Blue', code: '#0000FF' },
        { name: 'Yellow', code: '#FFFF00' },
        { name: 'Purple', code: '#800080' },
        { name: 'Orange', code: '#FFA500' },
    ];

    const generateTest = () => {
        // Randomly select a color
        const correctColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(correctColor.code);
        setCorrectAnswer(correctColor.name);

        // Generate incorrect options
        const incorrectColors = colors.filter(c => c.name !== correctColor.name);
        const shuffledIncorrect = incorrectColors.sort(() => 0.5 - Math.random()).slice(0, 2);

        // Combine and shuffle options
        const allOptions = [correctColor.name, ...shuffledIncorrect.map(c => c.name)];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);

        setStartTime(new Date().getTime()); // Start timer
        setTestFinished(false); // Reset test state
    };

    const handleAnswer = (answer) => {
        if (testFinished) return; // Prevent answering after test completion

        const endTime = new Date().getTime();
        const timeTakenInSeconds = (endTime - startTime) / 1000; // Time in seconds
        setTimeTaken(timeTakenInSeconds);
        setTestFinished(true); // Mark test as finished

        // Provide feedback
        if (answer === correctAnswer) {
            Alert.alert(`Correct! You took ${timeTakenInSeconds.toFixed(2)} seconds. You can start driving now`);
        } else {
            Alert.alert(`Wrong! The correct answer was ${correctAnswer}. Drive Safe!`);
        }

        navigation.navigate('Recording'); // Navigate to the next screen
    };

    useEffect(() => {
        generateTest(); // Generate a test when the screen loads
    }, []);

    return (
        <View style={styles.container}>
            {/* Display the color */}
            <View style={[styles.colorBox, { backgroundColor: color }]} />

            {/* Display options */}
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionBox}
                        onPress={() => handleAnswer(option)}
                        disabled={testFinished} // Disable after test completion
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {testFinished && (
                <Text style={styles.reactionTimeText}>
                    You took {timeTaken.toFixed(2)} seconds to answer.
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
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    colorBox: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    optionsContainer: {
        marginBottom: 20,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBox: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#1E90FF',
        borderRadius: 18,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    optionText: {
        fontSize: 20,
        color: '#333',
    },
    reactionTimeText: {
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default ColorIdentificationTestScreen;
