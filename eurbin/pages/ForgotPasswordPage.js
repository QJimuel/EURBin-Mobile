import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Logo from '../icons/Eurbin.png';

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
        <View style={styles.backgroundCircle} />
            <View style={styles.box}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Find your account</Text>
            <TextInput
                style={ styles.input }
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
        </View></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 300,
        height: 300,
        borderRadius: 50,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 60,
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#800000',
        borderRadius: 5,
        paddingVertical: 15,
        width: '100%', 
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Manjari',
        
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    success: {
        color: 'green',
        marginTop: 10,
    },
    logo:{
        height: 150,
        width: 150,
        tintColor: '##EFE720',
        marginBottom: 20,
       
    },
    backgroundCircle: {
        position: 'absolute',
        width: 350,
        height: 350,
        borderRadius: 200,
        backgroundColor: '#800000',
        top: -120,
        left: -100,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        color: '#2b0100',
        marginBottom: 20,
        fontFamily: 'Manjari',
        alignSelf: 'flex-start',
    },
});

export default ForgotPasswordPage;