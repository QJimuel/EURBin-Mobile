import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Trophy from '../icons/trophy2.png';

import { useUser } from './UserContext/User';

export default function AchievementPage() {
  const { currentUser, setCurrentUser } = useUser();


  return (
    <View style={styles.container}>
      <View style={styles.customBox}></View>

      <View style={styles.whiteContainer}>
        <Text style={styles.rText}>Rank: {currentUser.rank}</Text>
      </View>

      <ScrollView>
        <View style={styles.cardBckgrnd}>
          {currentUser.plasticBottle >= 50 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#47AA2E'} />
              <View>
                <Text style={styles.rankTitle}>Emerald Rank</Text>
                <Text style={styles.rankDescription}>Achieve the Emerald Rank</Text>
              </View>
            </View>
          )}

          {currentUser.plasticBottle >= 100 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#0A781C'} />
              <View>
                <Text style={styles.rankTitle}>Crusader Rank</Text>
                <Text style={styles.rankDescription}>Achieve the Crusader Rank</Text>
              </View>
            </View>
          )}

          {currentUser.plasticBottle >= 369 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#EFE720'} />
              <View>
                <Text style={styles.rankTitle}>Archon Rank</Text>
                <Text style={styles.rankDescription}>Achieve the Archon Rank</Text>
              </View>
            </View>
          )}  
          
          {currentUser.plasticBottle >= 500 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#F51C5D'} />
              <View>
                <Text style={styles.rankTitle}>Divine Rank</Text>
                <Text style={styles.rankDescription}>Achieve the Divine Rank</Text>
              </View>
            </View>
          )}  
          
          {currentUser.plasticBottle >= 1000 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#FD0D0D'} />
              <View>
                <Text style={styles.rankTitle}>Immortal Rank</Text>
                <Text style={styles.rankDescription}>Achieve the Immortal Rank</Text>
              </View>
            </View>
          )}  

          {currentUser.plasticBottle < 50 && (
            <View style={styles.card}>
              <Image source={Trophy} style={styles.icon} tintColor={'#000000'} />
              <View>
                <Text style={styles.rankTitle}>No Rank</Text>
                <Text style={styles.rankDescription}>Achieve the No Rank</Text>
              </View>
            </View>
          )}  


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  customBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#800000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rText: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
  },
  cardBckgrnd: {
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    height: 200,
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    borderRadius: 20,
    margin: 8,
    alignItems: 'center',
    width: '85%',
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  rankTitle: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 3,
  },
  rankDescription: {
    color: '#b3b3b3',
    fontSize: 15,
  },
});