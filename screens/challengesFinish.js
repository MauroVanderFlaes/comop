import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import Logo from "../components/logo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../theme";
import Nav from "../components/nav";
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';

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
                'comop-api-key': COMOP_API_KEY,
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
      <View style={styles.imgBox}>
          <Image source={require("../assets/images/stepsEnd.png")} style={styles.challengeImg}></Image>
        </View>
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
  
  imgBox: {
    marginTop: 10,
    width: 200,
    height: 100,
    marginBottom: 40,
  },

  challengeImg: {
    width: 200,
    height: 100,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    resizeMode: "contain",
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
    ...theme.textStyles.customText,
    fontSize: 18,
    color: "#1C1B1B",
  },
  creditsAmount: {
    ...theme.textStyles.customTitle,
    fontSize: 24,
    color: "#80F075",
    marginVertical: 10,
  },
  feedText: {
    ...theme.textStyles.customText,
    fontSize: 16,
    color: "#1C1B1B",
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
    ...theme.textStyles.customSubtitle,
    color: "#F2F2F2",
    fontSize: 16,
  },
});

export default ChallengesFinish;
