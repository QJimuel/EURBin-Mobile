import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Receipt from '../icons/receipt.jpg';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useUser(); 
  const [selectedTransaction, setSelectedTransaction] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Retrieve token
        const response = await fetch('https://eurbin.vercel.app/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add token to Authorization header
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const json = await response.json();
        setTransactions(json.transactions);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTransactions();
  }, []);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const onTransactionPress = (item) => {
    setSelectedTransaction(item);
    setModalVisible(true); 
  };

  const userTransactions = transactions.filter(
    transaction => transaction.userId.toString() === currentUser.userId.toString()
);


 
  const renderItem = ({ item }) => {


    // Determine status based on isAccepted
    const status = item.isAccepted === null ? 'Pending' : item.isAccepted ? 'Successful' : 'Failed';

    
    
    return (
       <TouchableOpacity onPress={() => onTransactionPress(item)}>
      <View style={styles.transactionBox}>
        <View style={styles.column}>
          <Text style={styles.transactionType}>{item.transactionName}</Text>
          <Text style={styles.transactionStatus}>{status}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.transactionAmount}>-{item.transactionPrice} SmartPoints</Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)} {formatTime(item.date)}</Text>
          <Text style={styles.transactionRef}>ref. {item.referenceNo}</Text>
        </View>
      </View></TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.customBox}></View>
      <Text style={styles.transactionText}>Transaction</Text>
      <FlatList
        data={userTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.referenceNo} 
        numColumns={1} 
        style={styles.list}
      />


       {selectedTransaction && (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
            {/*<Image source={selectedTransaction.isAccepted === null ? Pending : selectedTransaction.isAccepted ? Check : Failed} style={styles.check} />*/}
            <Image source={Receipt} style={styles.check}></Image>
            <Text style={styles.title}> Transaction Receipt </Text>
            
           
              
            {/*<Text style={styles.title}><Text style={{ color: selectedTransaction.isAccepted === null ? 'red' : selectedTransaction.isAccepted ? 'green' : 'gray'}}>
              {selectedTransaction.isAccepted === null ? 'Pending' : selectedTransaction.isAccepted ? 'Successful' : 'Failed'}</Text> Transaction
            </Text>


              <Text style={styles.modalTitle}>{selectedTransaction.transactionName}</Text>
*/}
              <View>
              
             
                {/*<Text> Status: <Text style={{ color: selectedTransaction.isAccepted === null ? 'red' : selectedTransaction.isAccepted ? 'green' : 'gray'}}>
                   {selectedTransaction.isAccepted === null ? 'Pending' : selectedTransaction.isAccepted ? 'Successful' : 'Failed'}</Text>
                </Text>*/}
              
                <View style={styles.detailsContainer}>
                  
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Status:</Text>
                    <Text style={{ color: selectedTransaction.isAccepted === null ? 'red' : selectedTransaction.isAccepted ? 'green' : 'gray'}}>
                   {selectedTransaction.isAccepted === null ? 'Pending' : selectedTransaction.isAccepted ? 'Successful' : 'Failed'}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Reward:</Text>
                    <Text>{selectedTransaction.transactionName} </Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Price:</Text>
                    <Text>{selectedTransaction.transactionPrice} SmartPoints</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Date:</Text>
                    <Text>{formatDate(selectedTransaction.date)}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Time:</Text>
                    <Text>{formatTime(selectedTransaction.date)}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsTitle}>Reference No.:</Text>
                    <Text>{selectedTransaction.referenceNo}</Text>
                  </View>
                </View>

              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.close}>CLOSE</Text></TouchableOpacity>
             
     
            </View>
          </View>
        </Modal>
       )}
    </View>
  );
};

export default TransactionPage;

const styles = StyleSheet.create({
  close: {
    marginTop: 50,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'flex-start',
    textAlign: 'flex-start'
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
  list: {
    width: '100%',
    padding: 10,
  },
  transactionBox: {
    backgroundColor: '#f0f0f0',
    margin:10,
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10, 
  },
  transactionType: {
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontWeight: 'bold', 
  },
  transactionStatus: {
    color: '#b3b3b3',
  },
  transactionDate: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  transactionRef: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  transactionText:{
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20
  },
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
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  check: {
    height: 50,
    width: 50,
    //tintColor: '#2b0100',
  },
  title: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '90%', 
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'right', 
  },
});