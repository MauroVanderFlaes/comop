// Camera.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { IPADRESS } from '../config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import theme from '../theme';
import Logo from './logo';

SplashScreen.preventAutoHideAsync();

const LogoImage = require('../assets/images/ComopLogo.png');

const CameraComponent = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    'AzoSans Regular': require('../assets/fonts/AzoSans-Regular.ttf'),
    'AzoSans Bold': require('../assets/fonts/AzoSans-Bold.ttf'),
    'AzoSans Medium': require('../assets/fonts/AzoSans-Medium.ttf'),
    'AzoSans Light': require('../assets/fonts/AzoSans-Light.ttf'),
  });

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [errorAlertShown, setErrorAlertShown] = useState(false); // State variable to track if error alert has been shown
  const lastTap = useRef(null);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  }

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      toggleCameraType();
    } else {
      lastTap.current = now;
    }
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const response = await fetch(`http://${IPADRESS}:3000/api/v1/gyms/compareQrCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode: data }),
      });

      const responseData = await response.json();
      if (responseData.status === 'success') {
        navigation.navigate('gymConfirm', { qrCode: data });
      } else {
        if (!errorAlertShown) { // Show the alert only if it hasn't been shown before
          Alert.alert('Error', 'Invalid QR code', [{ text: 'OK', onPress: () => setErrorAlertShown(false) }]);
          setErrorAlertShown(true); // Set the state to true to indicate that the alert has been shown
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Logo />
        <Camera 
          style={styles.camera} 
          type={type} 
          onBarCodeScanned={handleBarCodeScanned}
        >
          <View style={styles.qrContainer}>
            <View style={[styles.qrOutline, styles.topLeftCorner]} />
            <View style={[styles.qrOutline, styles.topRightCorner]} />
            <View style={[styles.qrOutline, styles.bottomLeftCorner]} />
            <View style={[styles.qrOutline, styles.bottomRightCorner]} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>

            </TouchableOpacity>
          </View>
        </Camera>
        <View style={styles.overlay}>
          <Text style={styles.customTitle}>Scan the QR code in your gym</Text>
          <Text style={styles.customText}>You will be automatically redirected after scanning</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { 
    width: 140, 
    height: 32,
    position: 'absolute',
    top: 100,
  },
  camera: {
    flex: 0.65,
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
  },
  qrContainer: {
    position: 'absolute',
    width: 254, // Adjust the width
    height: 254, // Adjust the height
    top: '50%',
    left: '50%',
    marginTop: -120,
    marginLeft: -120,
    zIndex: 2,
    overflow: 'hidden', // Ensure the corners are clipped properly
    borderRadius: 8, // Adjust the border radius as needed
  },
  text: {
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 3,
    height: '20%',
    marginTop: 0,
  },
  qrOutline: {
    position: 'absolute',
    borderColor: theme.colors.offwhite,
    borderWidth: 6,
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },

  customTitle: {
    ...theme.textStyles.customTitle,
    position: 'absolute',
    top : '20%',
  },
  customText: {
    ...theme.textStyles.customText,
    textAlign: 'center',
    position: 'absolute',
    top : '50%',
  },
});

export default CameraComponent;
