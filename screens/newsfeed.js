import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { IPADRESS, prod, render } from '../config';
import { useNavigation } from '@react-navigation/native';
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import ToggleButton from "../components/ToggleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PanGestureHandler } from 'react-native-gesture-handler';

const Newsfeed = () => {
    const [selectedOption, setSelectedOption] = useState("Newsfeed");
    const [gymMembers, setGymMembers] = useState([]);
    const navigation = useNavigation();

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
            console.log(json);
            setGymMembers(json.data.users);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSwipe = ({ nativeEvent }) => {
        if (nativeEvent.translationY < -50) {
            navigation.navigate('newsfeedGymfeed');
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
                        <Text style={styles.contentText}>Gym members</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                            <View style={styles.memberContainer}>
                                {(gymMembers?.length ?? 0) > 0 ? (
                                    gymMembers.map(member => (
                                        <View key={member._id} style={styles.member}>
                                            <Image 
                                                source={{ uri: member.imgUrl }} 
                                                style={styles.memberImage} 
                                            />
                                            <Text style={styles.username}>{member.username}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No gym members available</Text>
                                )}
                            </View>
                        </ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.contentText}>Gymfeed</Text>
                            <PanGestureHandler onGestureEvent={handleSwipe}>
                                <View style={styles.feedContainer}>
                                <Text style={styles.contentGymfeed}>Tap or swipe up for more</Text>
                                    <TouchableOpacity style={styles.navigationRect} onPress={() => navigation.navigate('newsfeedGymfeed')}></TouchableOpacity>
                                    <View>
                                        
                                        <Text style={styles.contentGymfeed}>placeholder gym message with blur</Text>
                                    </View>
                                </View>
                            </PanGestureHandler>
                        </View>
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
        justifyContent: "flex-start",
        alignItems: "center",
    },
    greetingContainer: {
        marginTop: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        ...theme.textStyles.customTitle,
        fontSize: 20,
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
    },
    memberContainer: {
        flexDirection: 'row',
        marginBottom: -50,
    },
    member: {
        alignItems: 'center',
        marginRight: 16,
    },
    memberImage: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginBottom: 5,
    },
    username: {
        ...theme.textStyles.customDetail,
    },
    container: {
        marginTop: 24,
    },
    feedContainer: {
        width: "100%",
        height: "62%",
        backgroundColor: "#343434",
        color: "#F2F2F2",
        borderRadius: 15,
        padding: 10,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    navigationRect: {
        backgroundColor: "#F2F2F2",
        width: "80%",
        height: 10,
        borderRadius: 50,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    contentGymfeed: {
       color: "#F2F2F2",
    },
});

export default Newsfeed;
