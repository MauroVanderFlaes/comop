// Challenges.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";

const Challenges = () => {
    return (
        <View style={styles.challengeStyle}>
            <Logo />
            <View>
                <UserGreeting style={theme.textStyles.NameTitle} />
                <Text style={theme.textStyles.customSubtitle}>Ready for a new opportunity today?</Text>
            </View>
            <Nav />
        </View>
    );
};

const styles = {
    challengeStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Challenges;
