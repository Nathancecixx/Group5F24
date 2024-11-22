import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const MathTestScreen = ({ navigation }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [operation, setOperation] = useState(''); // '+' | '-' | 'x'
    const [startTime, setStartTime] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [testStarted, setTestStarted] = useState(false);
    const [testFinished, setTestFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Generate the math problem and options
    const generateProblem = () => {
        const randomNum1 = Math.floor(Math.random() * 10) + 1;
        const randomNum2 = Math.floor(Math.random() * 10) + 1;
        setNum1(randomNum1);
        setNum2(randomNum2);

        // Randomly select an operation
        const operations = ['+', '-', 'x'];
        const selectedOperation = operations[Math.floor(Math.random() * operations.length)];
        setOperation(selectedOperation);

        // Calculate the correct answer based on the operation
        let correct;
        if (selectedOperation === '+') {
            correct = randomNum1 + randomNum2;
        } else if (selectedOperation === '-') {
            correct = randomNum1 - randomNum2;
        } else if (selectedOperation === 'x') {
            correct = randomNum1 * randomNum2;
        }
        setCorrectAnswer(correct);

        // Generate incorrect answers
        const incorrect1 = correct + Math.floor(Math.random() * 5) + 1;
        const incorrect2 = correct - Math.floor(Math.random() * 5) - 1;

        // Shuffle options
        const allOptions = [correct, incorrect1, incorrect2];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);

        setStartTime(new Date().getTime());  // Start timer
        setTestStarted(true);  // Start the test
        setTestFinished(false);  // Reset test finished state
        setSelectedAnswer(null);  // Reset selected answer
    };

    const handleAnswer = (answer) => {
        if (testFinished) return;  // Prevent answering after test is finished
        const endTime = new Date().getTime();
        const timeTakenInSeconds = (endTime - startTime) / 1000;  // Time taken in seconds
        setTimeTaken(timeTakenInSeconds);
        setTestFinished(true);  // Finish the test when the answer is selected
        setSelectedAnswer(answer);  // Set the selected answer

        // Handle feedback based on the answer
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            Alert.alert(`Correct! You took ${timeTakenInSeconds.toFixed(2)} seconds. You can now start driving!`);
        } else {
            Alert.alert(`Wrong! The correct answer is ${correctAnswer}. You took ${timeTakenInSeconds.toFixed(2)} seconds. Drive Safe!`);
        }

        navigation.navigate('Recording');  // Navigate to Recording screen to start driving
    };

    useEffect(() => {
        if (!testStarted) {
            generateProblem(); // Automatically generate a problem when the screen loads
        }
    }, [testStarted]);

    return (
        <View style={styles.container}>
            {testStarted && (
                <Text style={styles.question}>
                    Solve: {num1} {operation} {num2}
                </Text>
            )}

            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionBox}
                        onPress={() => handleAnswer(option)}
                        disabled={testFinished}  // Disable the options once the test is finished
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
    question: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
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

export default MathTestScreen;
