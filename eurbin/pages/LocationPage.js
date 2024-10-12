import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Mapa from '../icons/mapa.jpg';
import Location from '../icons/location.png'

export default function LocationPage() {
    
  return (
    <View style={styles.container}>
      <View style={styles.customBox}></View>
      <View style={styles.whiteBox}>
        <Image source={Mapa} style={styles.mapa} />
        <Text style={styles.mText}>Manuel S. Enverga University Central Canteen</Text>
        <View style={styles.hr}></View>
        <View style={styles.details}>
          <Image source={Location} style={styles.locIcon} />
          <Text style={styles.address}>XJ2F+767, Kalayaan Dr, Lucena, 4301 Quezon</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#800000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  whiteBox: {
    width: '80%',
    height: 500,
    backgroundColor: '#fff',
    marginTop: -100,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  mapa: {
    height: 250,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mText: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom:10,
  },
  hr: {
    borderBottomColor: '#b3b3b3', 
    borderBottomWidth: 1, 
    alignSelf: 'stretch', 
  },
  details: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locIcon: {
    height: 20,
    width: 20,
    tintColor: '#800000',
    marginRight: 5,
  },
  address: {
    fontSize: 12,
    color: 'gray',
  },
  
}); 