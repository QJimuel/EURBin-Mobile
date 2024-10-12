import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Three from '../icons/three_student.png';

const LandingPage = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />

      <View style={styles.content}>
        <Image source={Three} style={styles.image} resizeMode="contain" />

        <Text style={styles.title}>EURBin</Text>

        <Text style={styles.description}>
          EURBin are here to promote recycling, educate users and to create a
          positive impact on the environment and community.
          {'\n'}Sounds good right? Then let's get started.
        </Text>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('SignUp')} >
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#800000',
    top: -120,
    left: -100,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 60,
    fontWeight: '800',
    marginVertical: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 280,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default LandingPage;