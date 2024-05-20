import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { IPADRESS } from './config';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import gymConfirm from './screens/gymConfirm';
import Newsfeed from './screens/newsfeed';
import Challenges from './screens/challenges';
import Fitpass from './screens/fitpass';
import Profile from './screens/profile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/loginScreen';
const Stack = createStackNavigator();

const LogoImage = require('./assets/images/ComopLogo.png');

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


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

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
        <Stack.Screen name="Camera">
          {props => <CameraScreen {...props} navigation={props.navigation}/>}
        </Stack.Screen>

        <Stack.Screen name="gymConfirm" component={gymConfirm} />
        <Stack.Screen name="newsfeed" component={Newsfeed} />
        <Stack.Screen name="challenges" component={Challenges} />
        <Stack.Screen name="fitpass" component={Fitpass} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CameraScreen({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [errorAlertShown, setErrorAlertShown] = useState(false); // State variable to track if error alert has been shown
  const lastTap = useRef(null);

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
        if(responseData.status === 'success') {
          navigation.navigate('gymConfirm', { qrCode: data });
        }
        else {
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
      <View style={styles.container}>
        <Image source={LogoImage} style={styles.logo} />
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
            <Text style={styles.scanText}>Scan the QR code in your gym</Text>
            <Text style={styles.textMessage}>You will be automatically redirected after scanning</Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  logo: { 
    width: 140, 
    height: 32, 
    marginBottom: 20, 
    marginTop: -100 
  },

  camera: {
    flex: 0.6,
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 15,
    
    
  },
  qrContainer: {
    position: 'absolute',
    width: 270, // Adjust the width
    height: 270, // Adjust the height
    top: '50%',
    left: '50%',
    marginTop: -130,
    marginLeft: -130,
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
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 3,
    height: '18%',
    marginTop: 0,
  },
  scanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1B1B',
    position: 'absolute',
    top : '20%',
  },

  textMessage: {
    fontSize: 15,
    color: '#1C1B1B',
    position: 'absolute',
    top : '50%',
  },

  qrOutline: {
    position: 'absolute',
    borderColor: '#fff',
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
});
