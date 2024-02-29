import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'; 

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const lastTap = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function handleDoubleTap() {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      toggleCameraType();
    } else {
      lastTap.current = now;
    }
  }

  return (
<TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
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
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
  qrPlaceholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    backgroundColor: '#ccc', // Placeholder background color
    transform: [{ translateX: -100 }, { translateY: -100 }], // Center the placeholder
  },
});
