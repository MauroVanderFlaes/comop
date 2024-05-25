// Challenges.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";

const Challenges = () => {
    return (
        <View style={styles.challengeStyle}>
            <Logo />
            <Text>Challenges</Text>
            <Nav />
        </View>
    );
};

const styles = {
    challengeStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Challenges;
