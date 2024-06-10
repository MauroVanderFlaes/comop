import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../components/logo";
import { useNavigation } from '@react-navigation/native';

const ChallengesCountdown = ({ route }) => {
  const { challenge } = route.params;
  console.log('Challengeess:', challenge);
  const [countdown, setCountdown] = useState(3);
  const [userData, setUserData] = useState(null);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 0) {
        clearInterval(interval);
        setCountdownEnded(true);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          const user = JSON.parse(value);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    retrieveUserData();
  }, []);

  useEffect(() => {
    if (countdownEnded && userData) {
      const timer = setTimeout(() => {
        navigation.navigate('challengesActive', { challenge, userData });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownEnded, userData, navigation]);

  return (
    <View style={styles.container}>
        <Logo />
      <View style={styles.topTextContainer}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.officiallyStarts}>Officially starts in:</Text>
      </View>
      {!countdownEnded && (
        <Text style={styles.countdownNumber}>{countdown}</Text>
      )}

      <View style={styles.leftImageContainer}>
        <Image source={require('../assets/images/linesLeftImg.png')} style={styles.leftImage} />
      </View>

      <View style={styles.rightImageContainer}>
        <Image source={require('../assets/images/linesRightImg.png')} style={styles.rightImage} />
      </View>

      {countdownEnded && userData && (
        <Text style={styles.letsGetItText}>Let's get it {userData.username}!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  topTextContainer: {
    position: "absolute",
    top: 180,
    alignItems: "center",
  },
  challengeTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: 'AzoSans-Bold'
  },
  officiallyStarts: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'AzoSans-Regular'
  },
  countdownNumber: {
    fontSize: 128,
    fontWeight: "bold",
    marginTop: 100,
    fontFamily: 'AzoSans-Bold'
  },
  leftImageContainer: {
    position: 'absolute',
    top: 250,
    left: -80,
    zIndex: 1,
  },
  leftImage: {
    height: 56,
    width: 160,
  },
  rightImageContainer: {
    position: 'absolute',
    top: 600,
    right: -110,
    zIndex: 1,
  },
  rightImage: {
    height: 40,
    width: 216,
  },
  letsGetItText: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'AzoSans-bold'
  },
});

export default ChallengesCountdown;
