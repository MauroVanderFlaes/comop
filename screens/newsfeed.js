import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting"; // Importeer het nieuwe component

const Newsfeed = () => {
    return (
        <View style={styles.feed}>
            <Logo />
            <View>
                <UserGreeting />
                <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
            </View>
            <Nav />
        </View>
    );
};

const styles = {
    feed: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Newsfeed;
