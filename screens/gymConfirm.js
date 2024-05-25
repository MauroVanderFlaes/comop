// GymConfirm.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../components/logo';
import Nav from '../components/nav';
import { IPADRESS } from '../config'; 
import CustomButton from '../components/button';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Challenges from './challenges';
import theme from '../theme';

export default function GymConfirm({ route }) {
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
    navigation.navigate('signup'); // Navigate to Challenges screen
  };

  const goBack = () => {
    // Deze functie wordt uitgevoerd wanneer er op de link wordt geklikt
    navigation.navigate('Camera');
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
      <Text style={{...theme.textStyles.customText, marginTop: 20,}}>Not your gym? Click <Text style={{ color: theme.colors.purple_dark }} onPress={goBack}>here</Text> to re-scan QR code</Text>
      {/* <Nav /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
