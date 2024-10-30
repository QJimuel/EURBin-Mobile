import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import User from '../icons/user22.png';
import CO from '../icons/co2.png';
import { VictoryPie, VictoryLabel, VictoryLegend } from 'victory-native';
import { useUser } from './UserContext/User';



const ProfilePage = ({ navigation }) => {
  const { currentUser } = useUser();

  const [bottles, setBottles] = useState([]);
 

  
  useEffect(() => {
    const fetchBottles = async () => {
      try {
        const response = await fetch('https://eurbin.vercel.app/bottles');
        const json = await response.json();
        const userBottles = json.bottles.filter(bottle => Number(bottle.userId) === currentUser.userId);
        setBottles(userBottles);
      } catch (error) {
        console.error('Error fetching bottles:', error);
      }
    };

    fetchBottles();
  }, [currentUser]);

  const smallBottles = bottles.filter(bottle => bottle.Size === 'Small').length;
  const largeBottles = bottles.filter(bottle => bottle.Size === 'Large').length;
  const totalBottles = smallBottles + largeBottles;

  //const smallPercentage = totalBottles ? ((smallBottles / totalBottles) * 100).toFixed(2) : 0;
  //const largePercentage = totalBottles ? ((largeBottles / totalBottles) * 100).toFixed(2) : 0;


  const data = [
    { name: 'Small Plastic Bottles', population: smallBottles, color: '#FD9B08' },
    { name: 'Large Plastic Bottles', population: largeBottles, color: '#FF0404' },
  ];



  return (
    
    <View style={styles.container}>
      <View style={styles.customBox}>

        <View style={styles.profilePic}>
          <Image 
            source={ 
              currentUser.Image 
                ? { uri: currentUser.Image, cache: 'force-cache' } 
                : User
            } 
            style={styles.picIcon} 
          />
      </View>
        <Text style={styles.boxText}>{currentUser.userName}</Text>
        <Text style={styles.secondBoxText}>{currentUser.role}</Text>
        <Text style={styles.secondBoxText}>{currentUser.yearLevel} {currentUser.department}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.achievementGoalsButton} onPress={() => navigation.navigate('Achievement')}>
          <Text style={styles.achievementgoalsText}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.achievementGoalsButton} onPress={() => navigation.navigate('Goal')}>
          <Text style={styles.achievementgoalsText}>My Goals</Text>
        </TouchableOpacity>
      </View>
      

      <View style={styles.chartContainer}>
      <VictoryPie
  data={data}
  x="name"
  y="population"
  innerRadius={70}
  padAngle={2} // Adds space between segments

  labelRadius={({ innerRadius }) => innerRadius + 20}
  height={320}
  width={320}
  style={{
    data: {
      fill: ({ datum }) => datum.color,
      stroke: '#2b0100', // Stroke between segments
      strokeWidth: 3,
      gap: 5
    },
    parent:{
      border: "2px solid #000"
    },

  }}
  labels={({ datum }) =>
    datum.population > 0 ? `${((datum.population / totalBottles) * 100).toFixed(0)}%` : ''
  }
  labelComponent={
    <VictoryLabel
      textAnchor="middle"
      backgroundStyle={{ fill: 'rgba(255, 255, 255, 0.8)', rx: 8, ry: 8 }}
      backgroundPadding={{ left: 8, right: 8, top: 4, bottom: 4 }}
      style={{
        fontSize: 16,
        fontWeight: '600',
        fill: '#333',
      }}
    />
  }
/>



        <View style={styles.totalwasteRow}>
          <Text style={styles.totalwaste}>{currentUser.plasticBottle}</Text>
          <Text style={styles.wastelabel}>Total Bottles</Text>
        </View>

        <View style={styles.legendContainer}>
          <VictoryLegend
            x={10}
            y={3} 
            orientation="vertical"
            data={data.map(d => ({
              name: d.name, 
              symbol: { fill: d.color},
            }))}
            style={{
              labels: { fontSize: 12}, 
            }}
          />
        </View>
      </View>

      <View style={styles.coBox}>
        <View style={styles.coRow}>
          <Image source={CO} style={styles.coIcon} />
          <View style={styles.coColumn}>
            <Text style={styles.totalcarbon}>{currentUser.co2.toFixed(2)} kg</Text>
            <Text style={styles.carbonlabel}>CO₂ Reduction</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  customBox: {
    width: '100%',
    height: 215,
    backgroundColor: '#800000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Manjari-Bold',
  },
  secondBoxText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Manjari-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  achievementGoalsButton: {
    backgroundColor: '#800000',
    marginTop: 15,
    borderRadius: 20,
    height: 50,
    width: 155,
    justifyContent: 'center',
  },
  achievementgoalsText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Manjari-Regular',
  },
  totalwasteRow: {
    position: 'absolute',
    alignItems: 'center',
  },
  totalwaste: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 280, 
    width: 320,
    paddingBottom: 5,
    paddingTop: 20,
    
    
  },
  wastelabel: {
    fontSize: 20,
  },
  coBox: {
    width: 230,
    height: 90,
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  coRow: {
    flexDirection: 'row',
    gap: 20,
  },
  coIcon: {
    height: 50,
    width: 50,
    tintColor: '#fff',
  },
  totalcarbon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  carbonlabel: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picIcon: {
    width: 110,
    height: 110,
    borderRadius: 100
  },
  legendContainer: {
    alignItems: 'center',
    position: 'absolute',
     
  },
});