import React,{ useEffect, useState } from 'react';
import Bottle from '../icons/bottle.png'; 
import CO2 from '../icons/co2_colored.png'; 
import Point from '../icons/point.png'; 
import { View, Text, Image, StyleSheet, ScrollView ,ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

export default function AboutPage() {

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
    <ScrollView style={styles.container}>
      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.header}>About EURBin</Text>
        <Text style={styles.paragraph}>
          EURBin is an innovative solution aimed at promoting sustainable waste management through the use of IoT technology. This smart bin accepts plastic bottles and rewards users with Smart Points (SP) that can be exchanged for tangible rewards at the MSEUF Health and Safety Office.
        </Text>
        <Image source={Bottle} style={styles.image} />
      </View>

      {/* Benefits Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Benefits of Using EURBin</Text>
        <View style={styles.benefit}>
          <Image source={CO2} style={styles.benefitIcon} />
          <Text style={styles.benefitTitle}>Reduce CO2 Emissions</Text>
          <Text style={styles.benefitText}>
            By recycling plastic, you help reduce greenhouse gas emissions.
          </Text>
        </View>
        <View style={styles.benefit}>
          <Image source={Bottle} style={styles.benefitIcon} />
          <Text style={styles.benefitTitle}>Reduce Plastic Waste</Text>
          <Text style={styles.benefitText}>
            Every bottle recycled prevents more plastic waste from polluting the environment.
          </Text>
        </View>
        <View style={styles.benefit}>
          <Image source={Point} style={styles.benefitIcon} />
          <Text style={styles.benefitTitle}>Earn Points for Rewards</Text>
          <Text style={styles.benefitText}>
            Receive Smart Points that you can redeem for exciting rewards while helping the environment.
          </Text>
        </View>
      </View>

      {/* FAQs Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>FAQs</Text>
        <Text style={styles.faq}>
          <Text style={styles.boldText}>How do I earn Smart Points? </Text>
          You earn Smart Points by depositing plastic bottles into an EURBin and entering the redeemable code into the EURBin app.
        </Text>
        <Text style={styles.faq}>
          <Text style={styles.boldText}>What rewards can I get? </Text>
          You can redeem your Smart Points for rewards such as keychains, school supplies, and more!
        </Text>
        <Text style={styles.faq}>
          <Text style={styles.boldText}>Where can I find EURBins? </Text>
          EURBins are located at various points in the MSEUF campus. Check the app for locations.
        </Text>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.paragraph}>
          For more information or support, please contact us at: <Text style={styles.link}>support@eurbin.com</Text>
        </Text>
      </View>

      {/* Future Plans Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Future Plans</Text>
        <Text style={styles.paragraph}>
          We plan to expand EURBin to more locations and introduce new features in our app to enhance user experience.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
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
    marginBottom: 20,
    alignItems: 'center',
  },
  benefitIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#2B0100',
    fontFamily: 'Manjari-Bold',
  },
  benefitText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2B0100',
    fontFamily: 'Manjari-Regular',
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
});