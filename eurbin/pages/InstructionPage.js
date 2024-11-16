import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Step1 from '../icons/1.png';
import Step2 from '../icons/2.png';
import Step3 from '../icons/3.png';
import Step4 from '../icons/4.png';

export default function InstructionPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundCircle} >
      <Text style={styles.subHeader}>How to Use EURBin</Text>
      </View>
      <View style={styles.section}>

      
        <View style={styles.stepsWrapper}>
        <View style={styles.stepContainer}>
            <Image source={Step1} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 1</Text>
            <Text style={styles.stepDescription}>Deposit your plastic bottle into the bin.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={Step2} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 2</Text>
            <Text style={styles.stepDescription}>Receive a redeemable code displayed on the bin.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={Step3} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 3</Text>
            <Text style={styles.stepDescription}>Enter the redeemable code to earn Smart Points.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={Step4} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 4</Text>
            <Text style={styles.stepDescription}>Exchange your Smart Points for exciting rewards!</Text>
          </View>

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
  section: {
    marginBottom: 30,
    marginTop: 150,
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 80,
    marginLeft: 80,
    fontFamily: 'Manjari'

  },
  stepsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  stepImage: {
    width: 250, 
    height: 250, 
    resizeMode: 'contain', 
    marginBottom: 15,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: '#800000',
    justifyContent: 'center', // Aligns items to the top
    alignItems: 'center',
    justifyContent: 'center', 
    top: -100,
    left:-100

   
  },
});