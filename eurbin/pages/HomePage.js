import React, { useState, useEffect  } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Send from '../icons/send.png'; 
import Redeem from '../icons/redeem.png'; 
import Reward from '../icons/reward.png';
import List from '../icons/to_do_list.png';
import Leaderboard from '../icons/podium.png';
import Recycle from '../icons/recycle_sign.png';
import Location from '../icons/location.png';
import Close from '../icons/close.png';

import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const { currentUser, setCurrentUser } = useUser();


  const handleRedeemSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
        const redeemData = {
            redeemCode: redeemCode, 
            userId: currentUser.userId 
        };  


        const response = await fetch('https://eurbin.vercel.app/code', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(redeemData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to redeem the code');
        }

        const responseData = await response.json();

        setCurrentUser((prevUser) => {
           
            const updatedSmartPoints = prevUser.smartPoints + responseData.code.smartPoints;
            const updatedPlasticBottle = prevUser.plasticBottle + 50;
            const updatedAccumulatedSP = prevUser.accumulatedSP + responseData.code.smartPoints;
            const updatedCO2 = prevUser.co2 + (1 * 0.12);
            let updatedRank = ""



            if(updatedPlasticBottle < 50){
              updatedRank = "null"
            }

            if(updatedPlasticBottle >= 50){
              updatedRank = "Emerald"
            }
            if(updatedPlasticBottle >= 100){
              updatedRank = "Crusader"
            }
            if(updatedPlasticBottle >= 369){
              updatedRank = "Archon"
            }
            if(updatedPlasticBottle >= 500){
              updatedRank = "Divine"
            }
            if(updatedPlasticBottle >= 1000){
              updatedRank = "Emerald"
            }


            
            const updatedUserData = {
                userId: prevUser.userId,
                userName: prevUser.userName,
                email: prevUser.email,
                password: prevUser.password,
                smartPoints: updatedSmartPoints,
                plasticBottle: updatedPlasticBottle,
                rank: updatedRank,
                co2: updatedCO2,
                accumulatedSP: updatedAccumulatedSP,
            };
            

            fetch(`https://eurbin.vercel.app/user/${prevUser.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData),

            }).then((userUpdateResponse) => {
                if (!userUpdateResponse.ok) {
                    throw new Error(`User update failed. Status: ${userUpdateResponse.status}`);
                }
            }).catch((error) => {
                console.error('Error updating user:', error);
                Alert.alert('Error', 'User update failed. Please try again.');
            });

            return {
                ...prevUser,
                smartPoints: updatedSmartPoints,
                plasticBottle: updatedPlasticBottle,
                accumulatedSP: updatedAccumulatedSP,
                co2: updatedCO2,
            };
        });

        setModalVisible(false);
        Alert.alert('Success', `You have redeemed ${responseData.code.smartPoints} points!`);
    } catch (error) {
        console.error('Error redeeming code:', error);
        Alert.alert('Error', error.message || 'Failed to redeem the code. Please try again.');
    }
};



  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.customBox}>
        
        <Text style={styles.boxTextsmall}>Smart Points</Text>
        <Text style={styles.boxText}>{currentUser.smartPoints}</Text>
        <TouchableOpacity style={styles.redeemButton} onPress={() => setModalVisible(true)}>
          <Image source={Redeem} style={styles.redeemIcon} />
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.whiteBox}>
        <View style={styles.iconGrid}>
    
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Reward')}>
              <Image source={Send} style={styles.icon} />
              <Text style={styles.iconText}>Exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Login')}>
              <Image source={Reward} style={styles.icon} />
              <Text style={styles.iconText}>Reward</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Transaction')}>
              <Image source={List} style={styles.icon} />
              <Text style={styles.iconText}>Transaction</Text>
            </TouchableOpacity>
          </View>
        

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Leaderboard')}>
              <Image source={Leaderboard} style={styles.icon} />
              <Text style={styles.iconText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Reward')}>
              <Image source={Recycle} style={styles.icon} />
              <Text style={styles.iconText}>Recycle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Location')}>
              <Image source={Location} style={styles.icon} />
              <Text style={styles.iconText}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    

 
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
          <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>
            <Image source={Close} style={styles.closeButton}/>
          </TouchableOpacity>
            <Image source={Redeem} style={styles.ticket}/>
            <Text style={styles.modalTitle}>Redeem Active Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter code"
              value={redeemCode}
              onChangeText={setRedeemCode}
              placeholderTextColor="#aaa"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleRedeemSubmit}
              >
                <Text style={styles.buttonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}

export default HomePage;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 5,
  },
  boxTextsmall: {
    color: '#fff',
    fontSize: 14,
  },
  whiteBox: {
    width: '90%',
    height: 220,
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconGrid: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 30,

  },
  iconContainer: {
    width: 90, 
    alignItems: 'center',
    marginHorizontal: 10, 
    
  },
  icon: {
    width: 50,
    height: 50,
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5e0005',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    gap: 5,
  },
  redeemIcon: {
    tintColor: '#fff',
    width: 25,
    height: 25,
    marginRight: 5,
  },
  redeemText: {
    color: '#fff',
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 15,
    //fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  modalButtons: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //width: '100%',
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 5,
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeButton : {
    height: 15,
    width: 15,
    marginTop: 10,
  },
  close: {
    alignSelf: 'flex-end',
  },
  ticket: {
    height: 60,
    width: 60,
    marginTop: 20,
  },
});
