import React,{ useEffect, useState } from 'react';
import Bottle from '../icons/bottle.png'; 
import CO2 from '../icons/co2_colored.png'; 
import Point from '../icons/point.png'; 
import { View, Text, Image, StyleSheet, ScrollView ,ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Bot from '../icons/5.png';

export default function PrivacyPolicy() {

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
    return <ActivityIndicator  color="yellow" />;
  }
  return (
    <ScrollView style={styles.container}>
            <View style={styles.backgroundCircle} >
            <Text style={styles.header}>Privacy Policy</Text>
      </View>

      {/* Privacy Policy Section */}
      <View style={styles.content}>

     
      <View style={styles.section}>
        
        <Text style={styles.paragraph}>
        Welcome to EURBin! Your privacy is important to us, and this Privacy Policy explains how we collect, use, store, and protect your personal information when you use our mobile application EURBin.</Text>
        <Text style={styles.paragraph}>By using EURBin, you agree to the terms of this Privacy Policy.</Text>
        <Image source={Bot} style={styles.image} />
      </View>

      {/* Info we collect Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Information We Collect</Text>
        <View style={styles.benefit}>
          <Text style={styles.benefitTitle}>User Account Details</Text>
          <Text style={styles.benefitText}>
          Name, email address, and other identifiers you provide during registration.  
          </Text>
        </View>
        <View style={styles.benefit}>
        
          <Text style={styles.benefitTitle}>User Transactions</Text>
          <Text style={styles.benefitText}>
          Data about the smart points you earn, rewards redeemed, and your interaction with the IoT bins.  
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitTitle}>Bin Usage Data</Text>
          <Text style={styles.benefitText}>
          Information collected by the IoT bins, such as the number of bottles deposited and sensor readings.   
          </Text>
        </View>
      </View>

      {/* How we use info Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>How We Use Your Information</Text>
        <View style={styles.benefit}>
        
          <Text style={styles.benefitTitle}>To Provide Services</Text>
          <Text style={styles.benefitText}>
          Enable you to earn and redeem points, view transaction history, and interact with IoT bins.  
          </Text>
        </View>
      </View>

      {/* Your Rights Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Your Rights</Text>
        <View style={styles.benefit}>
          <Text style={styles.benefitText}>
          As a user, you have the following rights regarding your personal data:  
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitTitle}>Access</Text>
          <Text style={styles.benefitText}>
          Request access to the information we have collected about you.    
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitTitle}>Correction</Text>
          <Text style={styles.benefitText}>
          Update or correct inaccuracies in your data.  
          </Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.benefitTitle}>Deactivation</Text>
          <Text style={styles.benefitText}>
          Request the deactivation of your account.  
          </Text>
        </View>
      </View>

      {/* Third Party Links Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Third-Party Links</Text>
        <View style={styles.benefit}>
          <Text style={styles.benefitText}>
          The app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.  
          </Text>
        </View>
        
       
      </View>

      {/* Data security Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Data Security</Text>
        <View style={styles.benefit}>
          <Text style={styles.benefitText}>
          We encrypt your password to protect it from unauthorized access and ensure your data remains secure.
          </Text>
        </View>
      </View>

     

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy, please contact us: <Text style={styles.link}>eurbinmmq@gmail.com</Text>
        </Text>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  content: {
    marginBottom: 10,
    marginTop: 180,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    color: '#fff',
    fontFamily: 'Manjari-Bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 80,
    marginLeft: 60,
  },
  subHeader: {
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
    fontSize: 20,
    //marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2B0100',
    fontFamily: 'Manjari-Regular',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  benefit: {
    marginBottom: 5,
    //alignItems: 'center',
  },
  benefitIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 15,
    //marginBottom: 5,
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
    marginLeft: 5,
  },
  benefitText: {
    fontSize: 16,
    //textAlign: 'center',
    color: '#2B0100',
    fontFamily: 'Manjari-Regular',
    marginLeft: 15,
  },
  faq: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2B0100',
    fontFamily: 'Manjari-Regular',
  },
  boldText: {
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
  },
  link: {
    color: '#800000',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 200,
    backgroundColor: '#800000',
    justifyContent: 'center', // Aligns items to the top
    alignItems: 'center',
    justifyContent: 'center', 
    top: -100,
    left:-100,
    padding: 40

   
  },
});