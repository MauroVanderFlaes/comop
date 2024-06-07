import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { IPADRESS, prod, render } from '../config';
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import ToggleButton from "../components/ToggleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Newsfeed = () => {
    const [selectedOption, setSelectedOption] = useState("Newsfeed");
    const [gymMembers, setGymMembers] = useState([]);

    // get user data from async storage
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const parsedUserData = JSON.parse(userData);
                console.log("Userdata", parsedUserData);
                getGymMembers(parsedUserData.gymId);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUserData();
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const getGymMembers = async (gymId) => {
        let url;
        // Define the URL based on your environment
        if (prod) {
            url = `${render}/api/v1/users/${gymId}`;
        } else {
            url = `http://${IPADRESS}:3000/api/v1/users/${gymId}`;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const json = await response.json();
            console.log(json); // Log de ontvangen JSON-respons
            setGymMembers(json.data.users); // Dit moet mogelijk worden bijgewerkt
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.memberContainer}>
                                {/* Render the gym members here */}
                                {(gymMembers?.length ?? 0) > 0 ? (
                                    gymMembers.map(member => (
                                        <View key={member._id} style={styles.member}>
                                            <Image 
                                                source={{ uri: member.imgUrl }} 
                                                style={styles.memberImage} 
                                            />
                                            <Text>{member.username}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No gym members available</Text>
                                )}
                            </View>
                        </ScrollView>
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
        marginBottom: 10,
    },
    memberContainer: {
        flexDirection: 'row',
    },
    member: {
        alignItems: 'center',
        marginRight: 10, // Optional: Add some space between items
    },
    memberImage: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginBottom: 5, // Add some space between the image and the username
    },
});

export default Newsfeed;
