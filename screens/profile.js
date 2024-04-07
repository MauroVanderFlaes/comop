// Profile.js
import React from "react";
import { View, Text } from "react-native";
import Nav from "../components/nav";

const Profile = () => {
    return (
        <View style={styles.profileStyle}>
            <Text>Profile</Text>
            <Nav />
        </View>
    );
};

const styles = {
    profileStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};

export default Profile;
