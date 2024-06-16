import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import ArrowBack from "../components/arrowBack";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChallengesCategoryOne = () => {
    const [challenges, setChallenges] = useState([]);
    const [completedChallenges, setCompletedChallenges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Community Challenges");
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    console.log("userId", userId);

    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    console.log('User data retrieved:', user);
                    setUserId(user._id);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
    
        retrieveUserData();
    }, []);

    useEffect(() => {
        const fetchChallenges = async () => {
            let url;
            if (prod) {
                url = `${render}/api/v1/challenges`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/challenges`;
            }

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'comop-api-key': COMOP_API_KEY,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setChallenges(data.data || []);
                } else {
                    const errorData = await response.json();
                    console.log("Error fetching challenges:", errorData.message);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        };

        const fetchCompletedChallenges = async () => {
            if (!userId) return; // If userId is not set yet, do not proceed
            console.log("Fetching completed challenges for user:", userId);
            let url;
            if (prod) {
                url = `${render}/api/v1/gymfeed/${userId}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/gymfeed/${userId}`;
            }

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'comop-api-key': COMOP_API_KEY,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompletedChallenges(data.data || []);
                    console.log("Completed challenges:", data.data);
                } else {
                    const errorData = await response.json();
                    console.log("Error fetching completed challenges:", errorData.message);
                }
            } catch (error) {
                console.error("Error fetching completed challenges:", error);
            }
        };

        fetchChallenges();
        fetchCompletedChallenges();
    }, [userId]);

    const filterChallengesByCategory = (category) => {
        return challenges.filter(challenge => challenge.category === category);
    };

    const filteredChallenges = filterChallengesByCategory(selectedCategory);
    const completedChallengeIds = new Set(completedChallenges.map(completed => completed.challengeId._id));
    const completedChallengesCount = filteredChallenges.filter(challenge => completedChallengeIds.has(challenge._id)).length;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                <View style={styles.innerContainer}>
                    <Logo />
                    <View>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>Ready for a new opportunity today?</Text>
                    </View>
                    <View style={styles.boxComplete}>
                        <View style={styles.box1}>
                            <View style={styles.colorBox1}></View>
                            <Text style={styles.textBox1}>Not done</Text>
                        </View>
                        <View style={styles.box2}>
                            <View style={styles.colorBox2}></View>
                            <Text style={styles.textBox2}>Completed challenge</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.completeBox}>
                            <Text style={styles.textComplete}>Complete all</Text>
                            <View style={styles.boxAmount}>
                                <Text>{completedChallengesCount}/{filteredChallenges.length} done</Text>
                            </View>
                        </View>
                        <Image source={require("../assets/images/completedChallengesImg.png")} style={styles.image} />
                    </View>
                    {filteredChallenges.length > 0 ? (
                        filteredChallenges.map((challenge) => (
                            <TouchableOpacity
                                key={challenge._id}
                                style={[
                                    styles.boxChallenge,
                                    completedChallengeIds.has(challenge._id) && styles.completedChallenge
                                ]}
                                onPress={() => !completedChallengeIds.has(challenge._id) && navigation.navigate('challengesDetails', { challenge })}
                                disabled={completedChallengeIds.has(challenge._id)}
                            >
                                <Image source={{ uri: challenge.imageUrl }} style={styles.challengeImg} />
                                <View style={styles.contentChallenge}>
                                    <View style={styles.boxTextAbove}>
                                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                        <View style={[
                                            styles.boxHrs,
                                            completedChallengeIds.has(challenge._id) && styles.completedChallengeHrs
                                        ]}>
                                            <Text style={[
                                                styles.challengeHrs,
                                                completedChallengeIds.has(challenge._id) && styles.completedChallengeText
                                            ]}>
                                                {completedChallengeIds.has(challenge._id) ? "Completed" : `${challenge.time} hrs left`}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.textDescription}>{challenge.description.split(' ').slice(0, 8).join(' ')}{challenge.description.split(' ').length > 8 ? '...' : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No challenges available yet...</Text>
                    )}
                </View>
            </ScrollView>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: "center",
    },
    scrollContainer: {
        paddingBottom: 100,
        alignItems: "center",
    },
    innerContainer: {
        paddingTop: 130,
        alignItems: "center",
    },
    colorBox1: {
        width: 16,
        height: 16,
        backgroundColor: "#FFB952",
        borderRadius: 20,
    },
    colorBox2: {
        width: 16,
        height: 16,
        backgroundColor: "#80F075",
        borderRadius: 20,
    },
    boxComplete: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: 350,
        paddingTop: 20,
    },
    box1: {
        flexDirection: "row",
        alignItems: "center",
    },
    box2: {
        flexDirection: "row",
        alignItems: "center",
    },
    textBox1: {
        paddingLeft: 8,
        ...theme.textStyles.customText,
        fontSize: 16,
    },
    textBox2: {
        paddingLeft: 8,
        ...theme.textStyles.customText,
        fontSize: 16,
    },
    completeBox: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        width: 350,
        height: 42,
        backgroundColor: "#FFB952",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textComplete: {
        ...theme.textStyles.customText,
        fontSize: 16,
    },
    boxAmount: {
        backgroundColor: "#F2F2F2",
        borderRadius: 15,
        padding: 5,
    },
    boxChallenge: {
        width: 350,
        height: 130,
        backgroundColor: "#C9C9C9",
        borderRadius: 15,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 12,
    },
    completedChallenge: {
        backgroundColor: "#80F075",
    },
    completedChallengeHrs: {
        backgroundColor: "#1C1B1B",
    },
    completedChallengeText: {
        color: "#f2f2f2",
    },
    challengeImg: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    boxTextAbove: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 234,
        height: 24,
        paddingLeft: 8,
        paddingRight: 8,
    },
    contentChallenge: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: 100,
    },
    textDescription: {
        ...theme.textStyles.customText,
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 8,
        paddingTop: 16,
        marginTop: 10,
        width: "90%",
    },
    challengeTitle: {
        ...theme.textStyles.customTitle,
        fontSize: 16,
        paddingTop: 4,
        paddingLeft: 10,
        width: "60%",
        height: "200%",
        textAlign: "start",
    },
    challengeHrs: {
        ...theme.textStyles.customText,
        fontSize: 13,
        textAlign: "center",
        textAlignVertical: "center",
    },
    boxHrs: {
        backgroundColor: "#FFB952",
        borderRadius: 15,
        // padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
    },
    arrowBack: {
        top: 80,
        left: 7,
    },
    completedText: {
        color: "#1C1B1B",
        ...theme.textStyles.customText,
        paddingLeft: 8,
        paddingTop: 8,
    }
});

export default ChallengesCategoryOne;
