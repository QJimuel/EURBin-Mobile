import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function InstructionPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subHeader}>How to Use EURBin</Text>
        <View style={styles.stepsWrapper}>
          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 1</Text>
            <Text style={styles.stepDescription}>Locate the EURBin.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 2</Text>
            <Text style={styles.stepDescription}>Deposit your plastic bottle into the bin.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 3</Text>
            <Text style={styles.stepDescription}>The bin will display a code for you to enter in the app.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 4</Text>
            <Text style={styles.stepDescription}>Open the EURBin app.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 5</Text>
            <Text style={styles.stepDescription}>Enter the redeemable code to earn Smart Points (SP).</Text>
          </View>

          <View style={styles.stepContainer}>
            <Image source={require('../icons/bottle.png')} style={styles.stepImage} />
            <Text style={styles.stepTitle}>Step 6</Text>
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    marginTop: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 10,
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
});