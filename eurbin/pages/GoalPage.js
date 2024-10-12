import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Trophy from '../icons/trophy2.png';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalPage() {
  const { currentUser, setCurrentUser } = useUser();
  const [acknowledgement, setAcknowledgement] = useState('');
  const [claimedGoals, setClaimedGoals] = useState(new Array(5).fill(false)); // Array to track claimed goals

  const goals = [
    { title: 'Going for Emerald', description: 'Throw 50 plastic bottles', points: 100, requiredBottles: 50 },
    { title: 'Going for Crusader', description: 'Throw 100 plastic bottles', points: 200, requiredBottles: 100 },
    { title: 'Going for Archon', description: 'Throw 369 plastic bottles', points: 400, requiredBottles: 369 },
    { title: 'Going for Divine', description: 'Throw 500 plastic bottles', points: 1000, requiredBottles: 500 },
    { title: 'Going for Immortal', description: 'Throw 1000 plastic bottles', points: 2000, requiredBottles: 1000 },
  ];

  // Load claimed goals from AsyncStorage on mount
  useEffect(() => {
    const loadClaimedGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('claimedGoals');
        if (storedGoals) {
          setClaimedGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load claimed goals');
      }
    };

    loadClaimedGoals();
  }, []);

  // Handle claiming a goal
  const handleClaim = async (index, goal) => {
    const token = await AsyncStorage.getItem('token'); // Ensure token is retrieved for the fetch request

    if (currentUser.plasticBottle >= goal.requiredBottles) {
      const newSmartPoints = currentUser.smartPoints + goal.points;

      // Update claimed goals locally
      try {
        const newClaimedGoals = [...claimedGoals];
        newClaimedGoals[index] = true; // Mark this goal as claimed

        // Update AsyncStorage with new claimed goals
        await AsyncStorage.setItem('claimedGoals', JSON.stringify(newClaimedGoals));

        // Update current user points (you can save this locally or with your backend if needed)
        const updatedUser = {
          ...currentUser,
          smartPoints: newSmartPoints,
        };

        // Fetch request to update the backend
        const response = await fetch(`https://eurbin.vercel.app/user/${currentUser.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: currentUser.userId,
            userName: currentUser.userName,
            email: currentUser.email,
            smartPoints: newSmartPoints,
            plasticBottle: currentUser.plasticBottle, // Keep plasticBottle count intact
            rank: currentUser.rank,
            co2: currentUser.co2,
            accumulatedSP: currentUser.accumulatedSP,
            claimedGoals: newClaimedGoals, // Pass the claimed goals array
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user data');
        }

        // Update user state with the response from the backend
        const updatedUserFromServer = await response.json();
        setCurrentUser(updatedUserFromServer); // Update user context
        setClaimedGoals(newClaimedGoals); // Update local state
        setAcknowledgement(`Claimed ${goal.points} Smart Points!`);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Not Enough Bottles', 'You do not have enough plastic bottles to claim this reward.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.customBox}></View>

      <View style={styles.whiteContainer}>
        <Text style={styles.rText}>Rank</Text>
      </View>

      <ScrollView>
        {goals.map((goal, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.rankContent}>
              <Image source={Trophy} style={styles.icon} />
              <View>
                <Text style={styles.rankTitle}>{goal.title}</Text>
                <Text style={styles.rankDescription}>{goal.description}</Text>
              </View>
            </View>
            <View style={styles.points}>
              <Text style={styles.pointsText}>{goal.points}</Text>
              <Text style={styles.pointsText}>Smart Points</Text>
              {claimedGoals[index] ? (
                <Text style={styles.status}>Claimed</Text> // If claimed, show "Claimed"
              ) : (
                <TouchableOpacity onPress={() => handleClaim(index, goal)}>
                  <Text style={styles.status}>
                    {currentUser.plasticBottle >= goal.requiredBottles ? 'Claim' : 'Not enough'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {acknowledgement ? <Text style={styles.acknowledgement}>{acknowledgement}</Text> : null}
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    borderRadius: 20,
    margin: 8,
    alignItems: 'center',
  },
  rankContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  rankTitle: {
    fontSize: 20,
  },
  rankDescription: {
    color: '#b3b3b3',
  },
  points: {
    alignItems: 'center',
  },
  status: {
    marginTop: 3,
    color: '#b3b3b3',
    textDecorationLine: 'underline',
  },
  acknowledgement: {
    marginTop: 10,
    fontSize: 16,
    color: '#47AA2E',
    textAlign: 'center',
  },
});
