import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useUser } from './UserContext/User';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useUser(); // No need for setCurrentUser if not used

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://eurbin.vercel.app/transactions'); 
        const json = await response.json();
        console.log(json);
        setTransactions(json.transactions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    // Only render if the userId matches
    if (currentUser.userId.toString() !== item.userId) {
      return null; // Do not render anything if user IDs don't match
    }

    // Determine status based on isAccepted
    const status = item.isAccepted === null ? 'Pending' : item.isAccepted ? 'Successful' : 'Failed';

    return (
      <View style={styles.transactionBox}>
        <View style={styles.column}>
          <Text style={styles.transactionType}>{item.transactionName}</Text>
          <Text style={styles.transactionStatus}>{status}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.transactionAmount}>-{item.transactionPrice} SmartPoints</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionRef}>ref. {item.referenceNo}</Text>
        </View>
      </View>
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
    </View>
  );
};

export default TransactionPage;

const styles = StyleSheet.create({
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

  }
});
