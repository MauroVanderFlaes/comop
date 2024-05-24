<<<<<<< finishProfile---Jarne
import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { IPADRESS } from './config';
=======
// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera/legacy';
>>>>>>> master
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import gymConfirm from './screens/gymConfirm';
import Newsfeed from './screens/newsfeed';
import Challenges from './screens/challenges';
import Fitpass from './screens/fitpass';
import Profile from './screens/profile';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/loginScreen';
import CameraScreen from './screens/Scanner';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
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
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Camera">
          {props => <CameraScreen {...props} navigation={props.navigation} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
