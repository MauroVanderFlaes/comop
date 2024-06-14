import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
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
        <View style={styles.newsfeedStyle}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.con}>
                    <Logo />
                    <View style={styles.container}>
                        <View style={styles.greetingContainer}>
                            <UserGreeting />
                            <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
                        </View>
                        <View style={styles.contain}>
                            <ToggleButton
                                option1="Newsfeed"
                                option2="Leaderboard"
                                onOptionSelect={handleOptionSelect}
                            />
                            <View style={styles.content}>
                                {selectedOption === "Newsfeed" ? (
                                    <View style={styles.section}>
                                        <Text style={styles.contentText}>Gym members</Text>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                                        <View style={styles.containerFeed}>
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
                                        <View>
                                        <ScrollView horizontal={true} style={styles.leagues} showsHorizontalScrollIndicator={false}>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                           <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                            <TouchableOpacity ><Image style={styles.league} source={require("../assets/images/league.png")}></Image></TouchableOpacity>
                                        </ScrollView>
                                        </View>

                                        
                                        <View style={styles.myLeague}>
                                            <Text style={styles.contentText}> "NUMBER KG" League</Text>
                                            <Pressable onPress={() => navigation.navigate('leaderboardInfo')}><Image style={styles.imgInfo} source={require("../assets/icons/blackIconInfo.png")} /></Pressable>
                                        </View>
                                        <View>
                                            <View style={styles.leaderboard}>
                                                <View style={styles.leaderboardItem}>
                                                    <Text style={styles.placeNumber2}>2</Text>
                                                    <Pressable style={styles.place2} onPress={() => navigation.navigate('')}><Image style={styles.placeImage2} source={require("../assets/noProfile.png")} /></Pressable>
                                                    <Text style={styles.placeName}>Username</Text>
                                                </View>
                                                <View style={styles.leaderboardItem}>
                                                    <Text style={styles.placeNumber1}>1</Text>
                                                    <Pressable style={styles.place1} onPress={() => navigation.navigate('')}><Image style={styles.placeImage1} source={require("../assets/noProfile.png")} /></Pressable>
                                                    <Text style={styles.placeName}>Username</Text>
                                                </View>
                                                <View style={styles.leaderboardItem}>
                                                    <Text style={styles.placeNumber3}>3</Text>
                                                    <Pressable style={styles.place3} onPress={() => navigation.navigate('')}><Image style={styles.placeImage3} source={require("../assets/noProfile.png")} /></Pressable>
                                                    <Text style={styles.placeName}>Username</Text>
                                                </View>
                                            </View>
                                            <View style={styles.leaderboardList}>
                                                <View style={styles.userFirst}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naamFirst}>Username</Text>
                                                    <Text style={styles.challengesFirst}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.userSecond}>
                                                    <Text style={styles.number}>2</Text>
                                                    <Text style={styles.naamSecond}>Username</Text>
                                                    <Text style={styles.challengesSecond}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.userThirth}>
                                                    <Text style={styles.number}>3</Text>
                                                    <Text style={styles.naamThirth}>Username</Text>
                                                    <Text style={styles.challengesThirth}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                                <View style={styles.user}>
                                                    <Text style={styles.number}>1</Text>
                                                    <Text style={styles.naam}>Username</Text>
                                                    <Text style={styles.challenges}>AANTAL challenges</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({

    newsfeedStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    con: {
        flex: 1,
        alignItems: "center",
    },

    container: {
        display: "flex",
        gap: 20,
        marginTop: 150,
    greetingContainer: {
        marginTop: 130,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    greetingContainer: {
        marginLeft: 40,
    },

    contain: {
        display: "flex",
        alignItems: "flex-center",
        marginTop: 20
    },

    content: {
        marginTop: 20,
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
    containerFeed: {
        marginTop: 24,
    },
    feedContainer: {
        width: "100%",
        backgroundColor: "#343434",
        color: "#F2F2F2",
        borderRadius: 15,
        padding: 20,
        paddingBottom: 160,
        display: "flex",
        justifyContent: "center",
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


    imgInfo: {
        width: 30,
        height: 30,
    },

    leagues: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 40,
    },

    league: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 10,
    },

    myLeague: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },

    leaderboard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        textAlign: "center",
    },

    leaderboardItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        gap: 10,
    },

    placeNumber2: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 24,
    },

    placeNumber1: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 28,
    },

    placeNumber3: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    place2: {
        borderColor: theme.colors.purple_dark,
        borderWidth: 5,
        backgroundColor: theme.colors.purple_dark,
        borderRadius: 50,
    },

    place1: {
        borderColor: theme.colors.orange_dark,
        borderWidth: 5,
        backgroundColor: theme.colors.orange_dark,
        borderRadius: 50,
    },

    place3: {
        borderColor: theme.colors.blue_dark,
        borderWidth: 5,
        backgroundColor: theme.colors.blue_dark,
        borderRadius: 50,
    },

    placeImage2: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },

    placeImage1: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },

    placeImage3: {
        width: 64,
        height: 64,
        borderRadius: 50,
    },

    placeName: {
        color: theme.colors.offblack,
        ...theme.textStyles.customSubtitle,
        fontSize: 16,
    },

    leaderboardList: {
        marginTop: 20,
        marginBottom: 80,
    },

    userFirst: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: theme.colors.orange_dark,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
    },

    naamFirst: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    challengesFirst: {
        color: theme.colors.offblack,
        ...theme.textStyles.customDetail,
        fontSize: 14,
        paddingRight: 15,
    },

    userSecond: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: theme.colors.purple_dark,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
    },

    naamSecond: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    challengesSecond: {
        color: theme.colors.offblack,
        ...theme.textStyles.customDetail,
        fontSize: 14,
        paddingRight: 15,
    },

    userThirth: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: theme.colors.blue_dark,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
    },

    naamThirth: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    challengesThirth: {
        color: theme.colors.offblack,
        ...theme.textStyles.customDetail,
        fontSize: 14,
        paddingRight: 15,
    },

    user: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: theme.colors.offblack,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
    },

    number: {
        color: theme.colors.offblack,
        ...theme.textStyles.customTitle,
        fontSize: 20,
        backgroundColor: theme.colors.offwhite,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
    },

    naam: {
        color: theme.colors.offwhite,
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    challenges: {
        color: theme.colors.offwhite,
        ...theme.textStyles.customDetail,
        fontSize: 14,
        paddingRight: 15,
    },
});

export default Newsfeed;
