// Newsfeed.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";

const Newsfeed = () => {
    return (
        <View style={styles.feed}>
            <Text>Newsfeed</Text>
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
