import React, { useEffect, useReducer, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import ArrowBack from "../components/arrowBack";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import { IPADRESS, prod, render } from '../config';
import { useNavigation } from "@react-navigation/native";
import ChallengesActive from "./challengesActive";

const ChallengesCategoryOne = () => {
    const [challenges, setChallenges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Community Challenges");
    const navigation = useNavigation();

   

    useEffect(() => {
        const fetchData = async () => {
            let url;
            if (prod) {
                url = `${render}/api/v1/challenges`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/challenges`;
            }

            try {
                console.log(url);
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data);
                    setChallenges(data.data);

                } else {
                    const errorData = await response.json();
                    console.log("Error fetching challenges:", errorData.message);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }
        fetchData();
    }, []);



    const filterChallengesByCategory = (category) => {
        return challenges.filter(challenge => challenge.category === category);
    };

    const filteredChallenges = filterChallengesByCategory(selectedCategory);
    const completedChallengesCount = filteredChallenges.filter(challenge => challenge.completed).length;

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
                            <TouchableOpacity key={challenge._id} style={styles.boxChallenge} onPress={() => navigation.navigate('challengesDetails', { challenge })}>
                                <Image source={{ uri: challenge.imageUrl }} style={styles.challengeImg} />
                                <View style={styles.contentChallenge}>
                                    <View style={styles.boxTextAbove}>
                                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                        <View style={styles.boxHrs}><Text style={styles.challengeHrs}>{challenge.time} hrs left</Text></View>
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
        fontFamily: "AzoSans-Light",
    },
    textBox2: {
        paddingLeft: 8,
        fontFamily: "AzoSans-Light",
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
        fontFamily: "AzoSans-Regular",
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
        fontFamily: "AzoSans-Regular",
        fontSize: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16,
    },
    challengeTitle: {
        fontFamily: "AzoSans-Bold",
        fontSize: 16,
        paddingTop: 4,
    },
    challengeHrs: {
        fontFamily: "AzoSans-Regular",
        fontSize: 14,
    },
    boxHrs: {
        backgroundColor: "#FFB952",
        borderRadius: 15,
        padding: 5,
    },
    arrowBack: {
        top: 80,
        left: 7,
    }
});

export default ChallengesCategoryOne;
