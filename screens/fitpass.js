// Fitpass.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";

const Fitpass = () => {
    return (
        <View style={styles.fitpassStyle}>
            <Logo />
            <Text>Rewards</Text>
            <Nav />
        </View>
    );
};

const styles = {
    fitpassStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Fitpass;
