import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Trophy from '../icons/trophy2.png';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalPage() {
  const { currentUser, setCurrentUser } = useUser();
  const [acknowledgement, setAcknowledgement] = useState('');
  const [userRanks, setUserRanks] = useState([]); // Store user ranks

  const goals = [
    { title: 'Emerald', description: 'Throw 50 plastic bottles', points: 100, requiredBottles: 50, color: '#47AA2E' },
    { title: 'Crusader', description: 'Throw 100 plastic bottles', points: 200, requiredBottles: 100, color: '#0A781C' },
    { title: 'Archon', description: 'Throw 369 plastic bottles', points: 400, requiredBottles: 369, color: '#EFE720' },
    { title: 'Divine', description: 'Throw 500 plastic bottles', points: 1000, requiredBottles: 500, color: '#F51C5D' },
    { title: 'Immortal', description: 'Throw 1000 plastic bottles', points: 2000, requiredBottles: 1000, color: '#FD0D0D' },
  ];

  // Fetch the user's ranks from the backend
  useEffect(() => {
    const fetchUserRanks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          `https://eurbin.vercel.app/rank`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: currentUser.userId })
          }
        );
  
        const data = await response.json();
        console.log('Full API Response:', data); // Log the full API response
  
        // Ensure we're only extracting ranks with a defined 'rank' property
        const ranks = data.ranks ? data.ranks.filter(rank => rank.rank) : [];
  
        setUserRanks(ranks.map(rank => rank.rank)); // Extract only rank titles
        console.log(userRanks); // Log extracted ranks for debugging
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
  
    fetchUserRanks();
  }, []);
  
  

  // Handle claiming a goal
  const handleClaim = async (goal) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (currentUser.plasticBottle >= goal.requiredBottles) {
        const newSmartPoints = currentUser.smartPoints + goal.points;

        const updatedUser = {
          ...currentUser,
          smartPoints: newSmartPoints,
        };

        const userResponse = await fetch(
          `https://eurbin.vercel.app/user/${currentUser.userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!userResponse.ok) throw new Error('Failed to update user data');
        const updatedUserFromServer = await userResponse.json();
        setCurrentUser(updatedUserFromServer);

        const rankResponse = await fetch(
          `https://eurbin.vercel.app/rank`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: currentUser.userId,
              rank: goal.title,
            }),
          }
        );

        if (!rankResponse.ok) throw new Error('Failed to update rank');

        setAcknowledgement(`Claimed ${goal.points} Smart Points for ${goal.title}!`);
        setUserRanks((prevRanks) => [...prevRanks, goal.title]); // Add the new rank to state
      } else {
        Alert.alert('Not Enough Bottles', 'You do not have enough plastic bottles to claim this reward.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Check if the goal is already claimed
  const isGoalClaimed = (goalTitle) => userRanks.includes(goalTitle);

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
              <Image source={Trophy} style={[styles.icon, { tintColor: goal.color }]}  />
              <View>
                <Text style={styles.rankTitle}>{goal.title}</Text>
                <Text style={styles.rankDescription}>{goal.description}</Text>
              </View>
            </View>
            <View style={styles.points}>
              <Text style={styles.pointsText}>{goal.points}</Text>
              <Text style={styles.pointsText}>Smart Points</Text>
              {isGoalClaimed(goal.title) ? (
                <Text style={[styles.status, styles.claimedStatus]}>Claimed</Text>
              ) : currentUser.plasticBottle >= goal.requiredBottles ? (
                <TouchableOpacity onPress={() => handleClaim(goal)}>
                  <Text style={styles.status}>Claim</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.status, styles.notEnoughText]}>{goal.requiredBottles - currentUser.plasticBottle}</Text>
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
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'flex-start' },
  customBox: { width: '100%', height: 200, backgroundColor: '#800000', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  rText: { fontWeight: 'bold', fontSize: 30, padding: 10 },
  card: { flexDirection: 'row', justifyContent: 'space-between', height: 80, padding: 15, backgroundColor: '#fff', borderColor: '#b3b3b3', borderWidth: 1, borderRadius: 20, margin: 8, alignItems: 'center' },
  rankContent: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 25, height: 25, marginRight: 15 },
  rankTitle: { fontSize: 20 },
  rankDescription: { color: '#b3b3b3' },
  points: { alignItems: 'center' },
  status: { marginTop: 3, color: 'green'},
  claimedStatus: { color: '#b3b3b3',  },
  acknowledgement: { marginTop: 10, fontSize: 16, color: '#47AA2E', textAlign: 'center' },
  notEnoughText: { color: '#b3b3b3', fontSize: 11 },
});
