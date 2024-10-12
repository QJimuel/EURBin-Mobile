// screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutPage = () =>{
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
    </View>
  );
}

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
