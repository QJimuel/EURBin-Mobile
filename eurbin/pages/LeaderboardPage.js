import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../icons/user22.png';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          return;
        }

        // Make a request with the Bearer token in the headers
        const response = await fetch('https://eurbin.vercel.app/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the Bearer token
          },
        });

        const json = await response.json();
 

        // Sort the users by accumulatedSP in descending order
        const sortedUsers = json.users.sort((a, b) => b.accumulatedSP - a.accumulatedSP);
        setUsers(sortedUsers); // Assuming 'users' contains user data
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // Render item function for FlatList
  const renderItem = ({ item, index }) => (
    <View style={styles.userRow}>
      <Text style={styles.rank}>{index + 1}</Text>
      {item.Image ? (
                <Image source={{ uri: item.Image }} style={styles.picIcon2} />
              ) : (
                <Image source={User} style={styles.picIcon2} />
              )}
      <Text style={styles.username}>{item.userName}</Text>

      <Text style={styles.points}>{item.accumulatedSP.toFixed(1)}</Text>
    </View>
  );

  // Render the top 3 users in the custom box
  const renderTopThree = () => {
    return (
      <View style={styles.topThreeContainer}>
        {users.slice(0, 3).map((user, index) => {
          // Define dynamic styles based on rank
          let borderColor, backgroundColor;
  
          if (index === 0) {
            borderColor = '#FFF96C';  // Yellow for top 1
            backgroundColor = '#FFF96C';
          } else if (index === 1) {
            borderColor = '#78E1E8';  // Light Blue for top 2
            backgroundColor = '#78E1E8';
    
          } else if (index === 2) {
            borderColor = '#78FF9E';  // Light Green for top 3
            backgroundColor = '#78FF9E';
          }
  
          return (
            <View key={user.userId} style={styles.topUserRow}>
              <View style={[styles.profilePic, { borderColor }]}>
              {user.Image ? (
                <Image source={{ uri: user.Image }} style={styles.picIcon1} />
              ) : (
                <Image source={User} style={styles.picIcon} />
              )}
                <View style={[styles.topRank, { borderColor, backgroundColor }]}>
                  <Text style={styles.topRankText}>{index + 1}</Text>
                </View>
              </View>
  
              <Text style={styles.topUserName}>{user.userName}</Text>
              <Text style={styles.topPoints}>{user.accumulatedSP.toFixed(1)}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.customBox}>
        <Text>{renderTopThree()} </Text>{/* Render the top 3 users */}
      </View>
      <View style={styles.whiteBox}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Rank</Text>
              <Text style={styles.headerText}>User</Text>
              
              <Text style={styles.headerText}>Points</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default LeaderboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customBox: {
    width: '100%',
    height: 300,
    backgroundColor: '#800000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  
  },
  topUserRow: {
    alignItems: 'center',
    width: 90,
  },
  topRank: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 2,
    width: 30,
    height: 30,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    transform: [{ rotate: '45deg' }],
    position: 'absolute', 
    bottom: -20
  },
  topUserName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: -20
  },
  topPoints: {
    color: '#fff',
    bottom: -20
  },
  whiteBox: {
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '30%',
    textAlign: 'center',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  rank: {
    fontSize: 16,
    width: '10%',
    textAlign: 'center',
  },
  username: {
    fontSize: 16,
    width: '30%',
    textAlign: 'center',
  },
  department: {
    fontSize: 16,
    width: '30%',
    textAlign: 'center',
  },
  points: {
    fontSize: 16,
    width: '30%',
    textAlign: 'center',
  },
  picIcon: {
    width: 40,
    height: 40,
  },
  picIcon1: {
    width: 94,
    height: 94,
    borderRadius: 100
  },
  picIcon2: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  picIcon: {
    width: 55,
    height: 55,
  },
  topRankText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    transform: [{ rotate: '-45deg' }], // Rotate the text back
    textAlign: 'center',
  },
});