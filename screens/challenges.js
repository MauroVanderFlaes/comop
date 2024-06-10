import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import { IPADRESS, prod, render } from '../config';
import ChallengesActive from "./challengesActive";

const Challenges = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [activeChallengesExist, setActiveChallengesExist] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const navigation = useNavigation();

    const fetchData = useCallback(async () => {
        let url;
        if (prod) {
            url = `${render}/api/v1/challenges/active`;
        } else {
            url = `http://${IPADRESS}:3000/api/v1/challenges/active`;
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
                setChallenges(data.data);
    
                const activeChallenge = data.data.find(challenge => challenge.active);
                if (activeChallenge) {
                    goToActiveChallenge(activeChallenge);
                }
            } else {
                const errorData = await response.json();
                console.log("Error fetching challenges:", errorData.message);
            }
        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("Fetching challenges");
            fetchData();
        });
        
        return unsubscribe;
    }, [navigation]);

    const goToActiveChallenge = (activeChallenge) => {
        console.log("Navigating to active challenge");
        navigation.navigate('challengesActive', { challenge: activeChallenge });
    }

    const handlePress = () => {
        setIsOverlayVisible(!isOverlayVisible);
        console.log(isOverlayVisible);
    };

    const handleNavigate = () => {
        navigation.navigate('challengesCategoryOne');
    }

    return (
        <View style={styles.challengeStyle}>
            <Logo />
            <View>
                <UserGreeting style={theme.textStyles.NameTitle} />
                <Text style={theme.textStyles.customSubtitle}>Ready for a new opportunity today?</Text>
            </View>
            <View style={styles.categoryStyle}>
                <View style={styles.imgWrapper1}>
                    <TouchableOpacity onPress={handleNavigate}>
                        <Image source={require("../assets/images/imgCategory1.png")} style={styles.image} />
                    </TouchableOpacity>
                    {isOverlayVisible && 
                    <View style={styles.overlay}>
                        <Text style={styles.overlayTitle}>Community challenges</Text>
                        <Text style={styles.overlayBody}>"Together We Thrive: Join the community challenges and witness the incredible power of support and encouragement."</Text>
                    </View>}
                    <TouchableWithoutFeedback onPress={handlePress}>
                        <View style={[styles.corner, isOverlayVisible && styles.transparentCorner]}>
                            {isOverlayVisible ? (
                                <Image style={styles.imgInfoCross} source={require("../assets/icons/blackCrossIcon.png")} />
                            ) : (
                                <Image style={styles.imgInfo} source={require("../assets/icons/blackIconInfo.png")} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.colorBox1} onPress={handleNavigate}>
                        {!isOverlayVisible && <Text style={styles.colorBox1Text}>Community challenges</Text>}
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </View>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({
    challengeStyle: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 130,
        alignItems: "center",
    },

    categoryStyle: {
        paddingTop: 20,
    },

    colorBox1: {
        backgroundColor: "#FFB952",
        width: 350,
        height: 50,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },

    colorBox1Text: {
        paddingLeft: 20,
        color: "#1C1B1B",
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 20,
    },

    corner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 112,
        borderTopWidth: 83,
        borderLeftColor: 'transparent',
        borderTopColor: '#FFB952',
        borderTopRightRadius: 15,
    },

    transparentCorner: {
        borderTopColor: 'transparent',
    },

    imgWrapper1: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },

    imgInfo: {
        width: 23,
        height: 23,
        position: "absolute",
        top: -65,
        right: 15,
    },

    imgInfoCross: {
        width: 18,
        height: 18,
        position: "absolute",
        top: -62,
        right: 18,
    },

    image: {
        // width: 350,
        // height: 200,
        // borderRadius: 15,
    },
    
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 350,
        height: 250,
        backgroundColor: "#FFB952",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    overlayTitle: {
        color: "#1C1B1B",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
    },

    overlayBody: {
        color: "#1C1B1B",
        textAlign: "center",
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default Challenges;
