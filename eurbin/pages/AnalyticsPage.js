import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory-native';
import { useUser } from './UserContext/User';

export default function AnalyticsPage() {
    const { currentUser } = useUser();
    const [transactions, setTransactions] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState(null); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://eurbin.vercel.app/transactions');
                const json = await response.json();
                setTransactions(json.transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        const fetchRewards = async () => {
            try {
                const response = await fetch('https://eurbin.vercel.app/rewards');
                const json = await response.json();
                setRewards(json.rewards);
            } catch (error) {
                console.error('Error fetching rewards:', error);
            }
        };

        fetchTransactions();
        fetchRewards();
    }, [currentUser]);

    // Filter transactions to only include those for the current user
    const userTransactions = transactions.filter(
        transaction => transaction.userId.toString() === currentUser.userId.toString()
    );

    // Map rewards and count user-specific transactions for each reward
    const rewardNames = rewards.map(reward => reward.RewardName);
    const transactionCounts = rewards.map(reward => {
        const count = userTransactions.filter(transaction =>
            transaction.transactionName.toLowerCase() === reward.RewardName.toLowerCase()
        ).length;
        return count;
    });

    // Find the maximum transaction count to set Y-axis limit dynamically
    const maxCount = Math.max(...transactionCounts, 0);
    const yAxisMaxValue = Math.max(maxCount + 1, 5); 
    const barColors = ['#023E8A', '#800000', '#ffd700', '#90ee90', '#4682b4', '#9370db', '#ff69b4'];

    // Filter transactions based on selected reward (if any)
    const filteredTransactions = selectedReward
        ? userTransactions.filter(
              transaction =>
                  transaction.transactionName.toLowerCase() === selectedReward.toLowerCase()
          )
        : [];

    // Render each transaction item in the list
    const renderTransactionItem = ({ item }) => {
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

    // Render the bar chart or a message if no transactions exist
    const renderChart = () => (
        <View style={styles.barChartContainer}>
            <Text style={styles.chartTitle}>Claimed Rewards Breakdown</Text>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material} style={{ parent: { width: '100%' } }}>
                <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => tick}
                    style={{ tickLabels: { fill: '#000', fontSize: 12 } }}
                    domain={[0, yAxisMaxValue]} // Set Y-axis limit
                />
                <VictoryAxis
                    tickFormat={rewardNames}
                    style={{ tickLabels: { fill: '#000', fontSize: 12 } }}
                />
                <VictoryBar
                    data={userTransactions.length === 0 ? [] : rewardNames.map((reward, index) => ({
                        x: reward,
                        y: transactionCounts[index],
                    }))}
                    style={{
                        data: { fill: ({ index }) => barColors[index % barColors.length] },
                        labels: { fill: '#fff' },
                    }}
                    animate={{ duration: 1000, onLoad: { duration: 500 } }}
                    labelComponent={<VictoryLabel dy={-5} />}
                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onPressIn: (evt, clickedProps) => {
                                    const clickedReward = rewardNames[clickedProps.index];
                                    setSelectedReward(clickedReward); // Set the clicked reward
                                }
                            }
                        }
                    ]}
                />
            </VictoryChart>
            {userTransactions.length === 0 && (
                <Text style={styles.noTransactionText}>No transactions available</Text>
            )}
        </View>
    );
    

    const data = [
        { key: 'chart', render: renderChart },
        ...(selectedReward ? [{ key: 'transactions', data: filteredTransactions }] : []),
    ];

    const renderItem = ({ item }) => {
        if (item.key === 'chart') {
            return item.render();
        }
        return (
            <>
                <Text style={styles.selectedRewardText}>
                    Transactions for: {selectedReward}
                </Text>
                <FlatList
                    data={item.data}
                    renderItem={renderTransactionItem}
                    keyExtractor={(item) => item.referenceNo}
                    style={styles.transactionList}
                />
            </>
        );
    };

    return (
        <FlatList
            style={{ backgroundColor: '#fff' }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            ListHeaderComponent={
                <View style={styles.customBox}>
                    <Text style={styles.co2Text}>{currentUser.co2.toFixed(2)} kg</Text>
                    <Text style={styles.co2ReductionText}>CO2 Reduction</Text>
                </View>
            }
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
}


const styles = StyleSheet.create({
    noTransactionText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },    
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        position: 'relative',
        zIndex: 1,
    },
    barChartContainer: {
        width: '100%',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 15,
        marginBottom: -30,
    },
    co2Text: {
        color: '#fff',
        fontSize: 50,
        fontWeight: '900',
    },
    co2ReductionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    transactionBox: {
        marginLeft: 35,
        backgroundColor: '#fff',
        borderColor: '#000000', 
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
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
    selectedRewardText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        marginVertical: 10,
    },
    transactionList: {
        width: '94%',
    },
});