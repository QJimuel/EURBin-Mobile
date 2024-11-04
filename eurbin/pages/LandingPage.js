import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Three from '../icons/three_student.png';
import Logo from '../icons/Eurbin.png'


const LandingPage = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} >
        
      </View>

      <View style={styles.content}>
        <Image source={Logo} style={styles.image} resizeMode="contain" />

        <Text style={styles.title}></Text>

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
    width: 550,
    height: 550,
    borderRadius: 270,
    backgroundColor: '#800000',
    top: -110,

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 300,
    height: 300,
    tintColor: '#fff'
    
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    
    alignSelf: 'flex-start'
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