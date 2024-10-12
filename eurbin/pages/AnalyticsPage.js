import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native'; // Import Victory components
import { useUser } from './UserContext/User';

export default function AnalyticsPage() {
    const { currentUser } = useUser();
    const [transactions, setTransactions] = useState([]);
    const [rewards, setRewards] = useState([]);

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

    const rewardNames = rewards.map(reward => reward.RewardName);
    const transactionCounts = rewards.map(reward => {
        const count = transactions.filter(transaction =>
            transaction.transactionName.toLowerCase() === reward.RewardName.toLowerCase()
        ).length;
        return count; // Counts should be 0 if no transactions match
    });

    // Set the maximum value for the Y-axis to accommodate intervals of 10
    const maxCount = Math.max(...transactionCounts, 0); // Ensure it defaults to 0 if empty
    const yAxisMaxValue = Math.max(maxCount + 1, 5); // Ensure yAxisMaxValue is at least 10 or higher than maxCount


    return (
        <View style={styles.container}>
            <View style={styles.customBox}>
                <Text style={styles.title}>User Transactions</Text>
            </View>

            <View style={styles.barChartContainer}>
                <VictoryChart domainPadding={20} style={{ parent: { width: '100%' } }}>
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(tick) => tick}
                        style={{
                            tickLabels: { fill: '#000', fontSize: 12 },
                        }}
                        domain={[0, yAxisMaxValue]} // Set the domain for the y-axis
                    />
                    <VictoryAxis
                        tickFormat={rewardNames}
                        style={{
                            tickLabels: { fill: '#000', fontSize: 12 },
                        }}
                    />
                    <VictoryBar
                        data={rewardNames.map((reward, index) => ({
                            x: reward,
                            y: transactionCounts[index],
                        }))}
                        style={{
                            data: { fill: '#800000' },
                            labels: { fill: '#fff' },
                        }}
                        labelComponent={<VictoryLabel dy={-5} />}
                    />
                </VictoryChart>
            </View>
        </View>
    );
}

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
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    barChartContainer: {
        marginTop: 200,
        width: '100%', // Ensures the chart takes the full width of the container
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});