import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async () => {
        try {
            const response = await fetch('https://eurbin.vercel.app/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
                setErrorMessage('Succesfully send to your email');
            } else {
                setErrorMessage(data.message);
                setSuccessMessage('error');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
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
    success: {
        color: 'green',
        marginTop: 10,
    },
});

export default ForgotPasswordPage;
