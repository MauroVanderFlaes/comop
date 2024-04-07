import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import { IPADRESS } from './config';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import SignupScreen from './screens/SignupScreen';
const Stack = createStackNavigator();

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     console.log(`Scanned barcode of type ${type} with data: ${data}`);

//     try {
//         const response = await fetch(`http://${IPADRESS}:3000/api/v1/gyms/compareQrCode`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ qrCode: data }),
//         });

//         const responseData = await response.json();
//         console.log(responseData);
        
//         if(responseData.matched) {
//           navigation.navigate('login');
//         }

//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

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
      <Stack.Navigator>
        <Stack.Screen name="Camera">
          {props => <CameraScreen {...props} navigation={props.navigation}/>}
        </Stack.Screen>
        <Stack.Screen name="signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CameraScreen({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
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
    // console.log(`Scanned barcode of type ${type} with data: ${data}`);

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
          navigation.navigate('signup');
        }
        else {
          console.log("QR code not found");
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
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
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.overlay}>
            <Text style={styles.scanText}>Scan the QR code in your gym</Text>
          </View>
        </Camera>
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
  camera: {
    flex: 1,
    width: '100%',
    position: 'relative',
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 3, // Ensure the button is above the text
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3, // Ensure the text is above everything
  },
  scanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top : '20%',
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
