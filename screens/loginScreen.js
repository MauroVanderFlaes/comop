import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Logo from '../components/logo';
import { IPADRESS } from '../config'; // Make sure IPADRESS is correctly imported

export default function LoginScreen({ route }) {
  
  // api call to check if the qr code is valid
  const [gyms, setGyms] = useState([]); // State to store fetched gyms
  const scannedQrCode = route.params.qrCode; // Get scanned QR code from route params

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
      console.log(json); // Check what json.data is
      setGyms(json.data); // Set gyms state with fetched gym data
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    getGyms(); // Call getGyms function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once when component mounts


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
      <Image source={require('../assets/images/NewFitZaventem.png')} style={styles.img} />
      {gyms && (
        <View style={styles.boxGym}>
          <Text>Logo gym</Text>
          <Text style={styles.gymName}>{gyms.name}</Text>
          {/* Add more gym details here */}
        </View>
      )}
    </View>
  );
  
  
}

const styles = {
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

  }
};