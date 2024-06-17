// LoadingScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image, Text, Easing } from 'react-native';
import theme from '../theme';
import Logo from '../components/logo';

const LoadingScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 700, // Verkort de duur om de rotatie sneller te maken
          easing: Easing.easeInOut, // Toegevoegd ease-in en ease-out effect
          useNativeDriver: true,
        }),
        Animated.delay(500), // Wacht een halve seconde
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 0, // Reset de animatie onmiddellijk
          useNativeDriver: true,
        })
      ])
    );

    rotateAnimation.start();

    const dotAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 500,
          easing: Easing.easeInOut, // Toegevoegd ease-in en ease-out effect
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 500,
          easing: Easing.easeInOut, // Toegevoegd ease-in en ease-out effect
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 500,
          easing: Easing.easeInOut, // Toegevoegd ease-in en ease-out effect
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(dot1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      ])
    );

    dotAnimation.start();

  }, [rotateValue, dot1, dot2, dot3]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dot1Opacity = dot1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const dot2Opacity = dot2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const dot3Opacity = dot3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
        <Logo />
      <Animated.View style={[styles.loader, { transform: [{ rotate }] }]}>
        <Image source={require('../assets/icons/loadingIcon.png')} style={styles.image} />
      </Animated.View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading</Text>
        <Animated.Text style={[styles.dot, { opacity: dot1Opacity }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot2Opacity }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot3Opacity }]}>.</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.offwhite,
  },
  loader: {
    width: 150, // Maak de loader groter
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80, // Pas de grootte van de afbeelding aan
    height: 100,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    ...theme.textStyles.customTitle,
    fontSize: 24,
    color: '#000',
  },
  dot: {
    fontSize: 28,
    color: '#000',
  },
});

export default LoadingScreen;