import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import { useUser } from './UserContext/User';

import Receipt from '../icons/receipt.jpg';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useUser(); // No need for setCurrentUser if not used
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Track the selected transaction
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibilit

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://eurbin.vercel.app/transactions'); 
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

  // Handle transaction click
  const onTransactionPress = (item) => {
    setSelectedTransaction(item);
    setModalVisible(true); // Open modal with transaction details
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    // Only render if the userId matches
    if (currentUser.userId.toString() !== item.userId) {
      return null; // Do not render anything if user IDs don't match
    }

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
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.referenceNo} // Ensure id is a string
        numColumns={1} // Set number of columns to 1 for the FlatList
        style={styles.list}
      />

      {/* Modal for displaying transaction details */}
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
    flexDirection: 'row', // Set to row to create two columns
    justifyContent: 'space-between', // Space between columns
  },
  column: {
    flex: 1, // Take equal space for each column
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: 10, // Add horizontal padding for better spacing
  },
  transactionType: {
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontWeight: 'bold', // Indicating a deduction
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