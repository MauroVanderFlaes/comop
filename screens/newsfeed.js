// Newsfeed.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";

const Newsfeed = () => {
    return (
        <View style={styles.feed}>
            <Logo />
        <View>
            <Text style={theme.textStyles.NameTitle}>Hello naam,</Text>
            <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
        </View>
            <Text>Newsfeed/Leaderboard</Text>
            <Nav />
        </View>
    );
};

const styles = {
    feed: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};


export default Newsfeed;
