import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Logo from "../components/logo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../theme";
import Nav from "../components/nav";
import { IPADRESS, prod, render } from '../config';

const ChallengesFinish = ({ route }) => {
  const { challenge } = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value !== null) {
          const user = JSON.parse(value);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    retrieveUserData();
  }, []);

  const handleGoToGymfeed = async () => {
    let url;
    if (prod) {
        url = `${render}/api/v1/challenges/active/${challenge._id}`;
    } else {
        url = `http://${IPADRESS}:3000/api/v1/challenges/active/${challenge._id}`;
    }
    console.log('Deactivating challenge:', url);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: false }),
        });

        if (response.ok) {
            console.log("Challenge deactivated successfully");
            navigation.navigate("newsfeed");
        } else {
            const errorData = await response.json();
            console.log("Error deactivating challenge:", errorData.message);
        }
    } catch (error) {
        console.log("Error deactivating challenge:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <Text style={theme.textStyles.NameTitle}>Challenge Completed!</Text>
        <Text style={theme.textStyles.customSubtitle}>
          Congratulations, {userData?.username || "User"}!
        </Text>
        <View style={styles.creditsBox}>
          <Text style={styles.creditsText}>You will earn</Text>
          <Text style={styles.creditsAmount}>{challenge.credits} credits</Text>
        </View>
        <Text style={styles.feedText}>
          Your challenge proof will be placed in the gym feed.
        </Text>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={handleGoToGymfeed}
        >
          <Text style={styles.finishButtonText}>Go to Gymfeed</Text>
        </TouchableOpacity>
      </View>
      {/* <Nav /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  arrowBack: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 130,
    alignItems: "center",
  },
  creditsBox: {
    marginVertical: 20,
    alignItems: "center",
  },
  creditsText: {
    fontSize: 18,
    color: "#1C1B1B",
    fontFamily: "AzoSans-regular",
  },
  creditsAmount: {
    fontSize: 24,
    color: "#80F075",
    fontFamily: "AzoSans-bold",
    marginVertical: 10,
  },
  feedText: {
    fontSize: 16,
    color: "#1C1B1B",
    fontFamily: "AzoSans-regular",
    textAlign: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  finishButton: {
    width: 242,
    height: 48,
    backgroundColor: "#1C1B1B",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  finishButtonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "AzoSans-bold",
  },
});

export default ChallengesFinish;