import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Nav from "../components/nav";
import Logo from "../components/logo";

const ChallengesCategoryOne = () => {
  return (
    <View style={styles.challengeStyle}>
        <Logo />
        <Nav />
        
      
    </View>
  );
};


const styles = StyleSheet.create({

    challengeStyle: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 130,
        alignItems: "center",
    },


});

export default ChallengesCategoryOne;
