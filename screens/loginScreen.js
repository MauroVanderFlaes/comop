// LoginScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../components/logo';
import Nav from '../components/nav';
import { IPADRESS } from '../config'; 
import CustomButton from '../components/button';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Challenges from './challenges';

export default function LoginScreen({ route }) {
  const navigation = useNavigation(); // Initialize navigation

  const [gyms, setGyms] = useState([]);
  const scannedQrCode = route.params.qrCode;

  const getGyms = async () => {
    try {
      const response = await fetch(`http://${IPADRESS}:3000/api/v1/gyms/compareQrCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode: scannedQrCode }),
      });
      const json = await response.json();
      console.log(json);
      setGyms(json.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getGyms();
  }, []);

  const handleContinue = () => {
    navigation.navigate('challenges'); // Navigate to Challenges screen
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Image source={require('../assets/images/NewFitZaventem.png')} style={styles.img} />
      {gyms && (
        <View style={styles.boxGym}>
          <Text>Logo gym</Text>
          <Text style={styles.gymName}>{gyms.name}</Text>
        </View>
      )}
      <CustomButton onPress={handleContinue} title="Continue" />
      {/* <Nav /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    top: -150,
  },
  gymName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxGym: {
    display: 'flex',
    flexDirection: 'row',
  },
});
