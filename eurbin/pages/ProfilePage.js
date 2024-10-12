import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import User from '../icons/user22.png';
import CO from '../icons/co2.png';

import { useUser } from './UserContext/User';

const ProfilePage = ({ navigation }) => {
  const { currentUser } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.customBox}>
        
        <View style={styles.profilePic}>
          <Image source={User} style={styles.picIcon}></Image>
        </View>
        <Text style={styles.boxText}>{currentUser.userName}</Text>
        <Text style={styles.secondBoxText}>{currentUser.yearLevel} {currentUser.department}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.achievementGoalsButton} onPress={() => navigation.navigate('Achievement')}>
          <Text style={styles.achievementgoalsText}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.achievementGoalsButton} onPress={() => navigation.navigate('Goal')}>
          <Text style={styles.achievementgoalsText}>My Goals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalwasteRow}>
        <Text style={styles.totalwaste}>{currentUser.plasticBottle}</Text>
        <Text style={styles.wastelabel}>Total Waste</Text>
      </View>

      <View style={styles.coBox}>
        <View style={styles.coRow}>
          <Image source={CO} style={styles.coIcon}></Image>
          <View style={styles.coColumn}>
            <Text style={styles.totalcarbon}>{currentUser.co2} kg</Text>
            <Text style={styles.carbonlabel}>CO₂ Reduction</Text>
          </View>  
        </View>    
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  customBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#800000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 30,
  },
  secondBoxText: {
    color: '#fff',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  achievementGoalsButton: {
    backgroundColor: '#800000',
    marginTop: 40,
    borderRadius: 20,
    height: 50,
    width: 155,
    justifyContent: 'center',
  },
  achievementgoalsText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  totalwasteRow: {
    paddingTop: 50,
    alignItems: 'center',
  },
  totalwaste: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  wastelabel: {
    fontSize: 30,
  },
  coBox: {
    marginTop: 70,
    width: 230,
    height: 90,
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  coRow: {
    flexDirection: 'row',
    gap: 20,
  },
  coIcon: {
    height: 50,
    width: 50,
    tintColor: '#fff',
  },
  totalcarbon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  carbonlabel: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 3, 
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picIcon: {
    width: 70,
    height: 70,
  },
});