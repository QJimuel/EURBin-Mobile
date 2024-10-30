// screens/LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button ,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from './UserContext/User';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { setCurrentUser } = useUser();
  

    
    const handleLogin = async () => {
      try {
        
          const response = await fetch('https://eurbin.vercel.app/user/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                  ,
              },
              body: JSON.stringify({ userName: username, password }),
          });

          const data = await response.json();

          if (response.ok) {

            await AsyncStorage.setItem('userId', data.user.userId.toString());
            await AsyncStorage.setItem('token', data.token);
            console.log(data.user)
            setCurrentUser(data.user);



          
          

              navigation.navigate('Home');
          } else {
              Alert.alert('Error', data.message || 'Invalid credentials');
              setErrorMessage(data.message);
          }
      } catch (error) {
          console.error('Error during login:', error);
          Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>EURBin</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Text style={styles.togglePassword}>
            {passwordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.loginPrompt}>
          Don't have an account?
        <Text onPress={() => navigation.navigate('SignUp')} style={styles.loginLink}> Sign Up</Text>
      </Text>
      </View>
    </View>
  );
}

export default LoginPage;

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
  title: {
    fontWeight: 'bold',
    fontSize: 70,
    color: 'black',
    marginBottom: 40,
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
    borderRadius:5,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  togglePassword: {
    color: '#800000',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  signupText: {
    color: '#800000',
    marginTop: 20,
  },
  loginPrompt: {
    marginTop: 20,
    color: '#2b0100',
  },
  loginLink: {
    color: '#800000',
    fontWeight: 'bold',
  },
});
