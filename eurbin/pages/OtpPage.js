import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPVerification = ({ route, navigation }) => {
    const email = route?.params?.email || ''; // Safe access with a fallback
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    console.log('Email:', email); // Debugging output

    const verifyOTP = async () => {
        if (!email || !otp) {
            setErrorMessage('Email or OTP is missing');
            return;
        }

        try {
            const response = await fetch('https://eurbin.vercel.app/user/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            if (!response.ok) throw new Error('Invalid OTP');

            const data = await response.json();
            console.log('OTP Verified:', data);
            navigation.navigate('Login'); // Redirect to login
        } catch (error) {
            setErrorMessage('Failed to verify OTP: ' + error.message);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 15,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default OTPVerification;
