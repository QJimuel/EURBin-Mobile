import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

import * as Font from 'expo-font';

const OTPVerification = ({ route, navigation }) => {
    const email = route?.params?.email || ''; // Safe access with a fallback
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');

     // Create refs for each OTP input
     const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];


     const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
    
        // If deleting
        if (text === '') {
            newOtp[index] = ''; // Clear the value
            setOtp(newOtp);
            if (index > 0) {
                otpRefs[index - 1].current.focus(); // Move back on delete if not first
            }
        } else {
            // Otherwise, add digit and go to next input
            newOtp[index] = text;
            setOtp(newOtp);
            if (index < otp.length - 1) {
                otpRefs[index + 1].current.focus(); // Move forward if not last
            }
        }
    };
    

    const verifyOTP = async () => {
        const otpCode = otp.join('');
        if (!email || otpCode.length !== 4) {
            setErrorMessage('Please enter the complete OTP');
            return;
        }

        try {
            const response = await fetch('https://eurbin.vercel.app/user/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpCode }),
            });

            if (!response.ok) throw new Error('Invalid OTP');

            const data = await response.json();
            console.log('OTP Verified:', data);
            navigation.navigate('Login'); // Redirect to login
        } catch (error) {
            setErrorMessage('Failed to verify OTP: ' + error.message);
        }
    };

    const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Manjari-Regular': require('../assets/fonts/Manjari-Regular.ttf'),
        'Manjari-Bold': require('../assets/fonts/Manjari-Bold.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="yellow" />;
  }
    return (
        <View style={styles.container}>
        
            <Text style={styles.title}><Text style={styles.boldText}>Verify Code</Text></Text>
            <Text style={styles.subtitle}>Please enter the verification code that sent to <Text style={styles.subtitle2}>{email}</Text></Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={otpRefs[index]}
                        style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        selectionColor="transparent"
                    />
                ))}
            </View>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Text style={styles.loginPrompt}>
                Didn't receive the code?
            <Text onPress={() => navigation.navigate('')} style={styles.loginLink}> Resend</Text>
            </Text>
            <TouchableOpacity onPress={verifyOTP} style={styles.button}>
                <Text style={styles.buttonText}><Text style={styles.boldText}>Verify</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 25,
        color: '#2b0100',
        fontFamily: 'Manjari-Regular',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#8a8a8a',
        textAlign: 'center',
        marginBottom: 40,
        width: '90%',
        fontFamily: 'Manjari-Regular',
    },
    subtitle2: {
        fontSize: 15,
        color: '#2b0100',
        textAlign: 'center',
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 30,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    otpInputFilled: {
        borderColor: '#800000',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#800000',
        borderRadius:5,
        paddingVertical: 15,
        paddingHorizontal: 100,
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Manjari-Regular',
        marginBottom: -5,
    },
    otpIcon: {
        marginLeft: 45,
        height:80,
        width: 80,
        tintColor: '#2b0100',
        marginBottom: 40,
    },
    loginPrompt: {
        marginTop: 10,
        color: '#2b0100',
        fontFamily: 'Manjari-Regular',
    },
    loginLink: {
        color: '#800000',
        fontWeight: 'bold',

    },
});

export default OTPVerification;