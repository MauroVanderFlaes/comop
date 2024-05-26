// Newsfeed.js

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import ToggleButton from "../components/ToggleButton";

const Newsfeed = () => {
    const [selectedOption, setSelectedOption] = useState("Newsfeed");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.feed}>
            <Logo />
            <View style={styles.greetingContainer}>
                <UserGreeting />
                <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
            </View>
            <ToggleButton
                option1="Newsfeed"
                option2="Leaderboard"
                onOptionSelect={handleOptionSelect}
            />
            <View style={styles.content}>
                {selectedOption === "Newsfeed" ? (
                    <View style={styles.section}>
                        <Text style={styles.contentText}>Newsfeed</Text>
                        <Text style={styles.paragraph}>Gym members</Text>
                    </View>
                ) : (
                    <View style={styles.section}>
                        <Text style={styles.contentText}>Leaderboard</Text>
                        <Text style={styles.paragraph}>Leaderboard stuff</Text>
                    </View>
                )}
            </View>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({
    feed: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    greetingContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    content: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 20,
    },
    contentText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
});

export default Newsfeed;
