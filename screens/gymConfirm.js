import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Logo from '../components/logo';
import CustomButton from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { IPADRESS, prod, render } from '../config';
import theme from '../theme';

const { width } = Dimensions.get('window'); // Get the width of the screen

export default function GymConfirm({ route }) {
  const navigation = useNavigation();

  const [gyms, setGyms] = useState(null);
  const scannedQrCode = route.params.qrCode;

  const getGyms = async () => {
    let url;
    if (prod) {
      url = `${render}/api/v1/gyms/compareQrCode`;
    } else {
      url = `http:/${IPADRESS}:3000/api/v1/gyms/compareQrCode`;
    }
    try {
      const response = await fetch(url, {
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
    navigation.navigate('signup');
  };

  const goBack = () => {
    navigation.navigate('Camera');
  };

  useEffect(() => {
    if (gyms) {
      console.log("Image URL:", gyms.imageData);
    }
  }, [gyms]);

  return (
    <View style={styles.container}>
      <Logo />
      {gyms && gyms.imageData ? (
        <Image source={{ uri: gyms.imageData }} style={styles.img} />
      ) : (
        <Image source={require('../assets/images/NewFitZaventem.png')} style={styles.img} />
      )}
      {gyms && (
        <View style={styles.boxGym}>
          <Text style={styles.gymName}>{gyms.name}</Text>
        </View>
      )}
      <CustomButton onPress={handleContinue} title="Continue" />
      <Text style={{ ...theme.textStyles.customText, marginTop: 40, paddingLeft: 20, paddingRight: 20 }}>
        Not your gym? Click <Text style={{ color: theme.colors.purple_dark }} onPress={goBack}>here</Text> to re-scan QR code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure the container has relative positioning
  },
  img: {
    width: width, // Full width of the screen
    height: 280, // Fixed height
    resizeMode: 'cover',
    position: 'absolute', // Absolute positioning
    top: 152, // 152 pixels from the top
  },
  gymName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxGym: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 350, // Adjust to position the text box below the image
    marginBottom: 20,
  },
});
