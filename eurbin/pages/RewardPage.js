import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Modal, Alert, Image} from 'react-native';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RewardPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch('https://eurbin.vercel.app/rewards'); 
        const json = await response.json();
        setRewards(json.rewards);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  const handleBuyReward = async () => {
    const token = await AsyncStorage.getItem('token');
  
    if (currentUser.smartPoints >= selectedReward.Price) {

       
        const updatedSmartPoints = currentUser.smartPoints - selectedReward.Price;

      
        const updatedUserData = {
            userId: currentUser.userId,        
            userName: currentUser.userName,    
            email: currentUser.email,
            password: currentUser.password,    
            smartPoints: updatedSmartPoints,   
            plasticBottle: currentUser.plasticBottle, 
            rank: currentUser.rank,            
            co2: currentUser.co2,              
            accumulatedSP: currentUser.accumulatedSP 
        };

        try {
            
            const response = await fetch(`https://eurbin.vercel.app/user/${currentUser.userId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData), 
            });

            const responseData = await response.json(); 

            console.log('API URL:', `https://eurbin.vercel.app/user/${currentUser.userId}`);
            console.log('API Response:', responseData);

            
            if (response.ok) {
                
                setCurrentUser({
                    ...currentUser,
                    smartPoints: updatedSmartPoints,
                });

               
                const transactionData = {
                    userId: currentUser.userId,
                    transactionName: selectedReward.RewardName,  
                    transactionPrice: selectedReward.Price,    
                    isAccepted: null                    
                };

                
                const transactionResponse = await fetch(`https://eurbin.vercel.app/transactions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transactionData),
                });

                const transactionResponseData = await transactionResponse.json();
                console.log('Transaction Response:', transactionResponseData);

                if (transactionResponse.ok) {
                  
                    const updatedRewardQuantity = selectedReward.Quantity - 1;

                    
                    const updatedRewardData = {
                        RewardName: selectedReward.RewardName,
                        Category: selectedReward.Category,
                        Quantity: updatedRewardQuantity,    
                        Price: selectedReward.Price,
  
                    };

                    
                    const rewardResponse = await fetch(`https://eurbin.vercel.app/rewards/${selectedReward._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedRewardData),
                    });

                    const rewardResponseData = await rewardResponse.json();
                    console.log('Reward Update Response:', rewardResponseData);

                    if (rewardResponse.ok) {
                       
                        setModalVisible(false);

                        
                        Alert.alert('Purchase Successful', `You have bought ${selectedReward.RewardName} for ${selectedReward.Price} SP!`);
                    } else {
                        throw new Error('Reward update failed');
                    }
                } else {
                    throw new Error('Transaction creation failed');
                }
            } else {
                
                const errorMessage = responseData.message || 'Failed to update smart points';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error during API call:', error.message);
            Alert.alert('Error', 'Failed to process your purchase. Please try again.');
        }
    } else {
        
        Alert.alert('Insufficient Smart Points', 'You do not have enough Smart Points to buy this reward.');
    }
};



  const openModal = (item) => {
    setSelectedReward(item);  
    setModalVisible(true);   
  };

  const renderReward = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image source={{ uri: item.Image }} style={styles.rewardImage} /> 
      <Text style={styles.rewardText}>Reward: {item.RewardName}</Text>
      <Text style={styles.rewardText}>Price: {item.Price} SP</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => openModal(item)}>
          <Text style={styles.buyText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.customBox}>
        <Text style={styles.customBoxTextP}>{currentUser.smartPoints}</Text>
        <Text style={styles.customBoxTextSP}>Smart Points</Text>
      </View>


      
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}  
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {selectedReward && (
              <>
                <Image source={{ uri: selectedReward.Image }} style={styles.rewardImage} />
                <Text style={styles.modalText}>Reward: {selectedReward.RewardName}</Text>
                <Text style={styles.modalText}>Price: {selectedReward.Price} SP</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelMButton}
                    onPress={() => setModalVisible(false)}
                  >
                  <Text style={styles.cancelMText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buyMButton}
                    onPress={handleBuyReward}
                  >
                    <Text style={styles.buyMText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}


export default RewardPage;

const screenWidth = Dimensions.get('window').width;

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
  customBoxTextP: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginRight: 170,
  },
  customBoxTextSP: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 170,
  },
  flatListContainer: {
    paddingHorizontal: 8,  
    paddingTop: 16,
  },
  rewardContainer: {
    width: (screenWidth / 2) - 24,  
    height: 200,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#5e0005',
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,  
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
 
  },
  rewardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#5e0005',
    borderRadius: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginLeft: 70
  },
  buyText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buyMButton: {
    backgroundColor: '#5e0005',
    borderRadius: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  buyMText: {
    color: 'white',
  },
  cancelMButton: {
    backgroundColor: 'white',
    borderColor: '#5e0005',
    borderWidth: 1,
    borderRadius: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginRight: 20,
  },
  cancelMText: {
    color: '#5e0005',
  },
  rewardImage:{
    height: 70,
    width: 70,
    borderRadius: 5
  }
  
});