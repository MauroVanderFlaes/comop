// Fitpass.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";

const Fitpass = () => {
    return (
        <View style={styles.fitpassStyle}>
            <Text>Fitpass</Text>
            <Nav />
        </View>
    );
};

const styles = {
    fitpassStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Fitpass;
