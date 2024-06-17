import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Nav from "../components/nav";
import Logo from "../components/logo";
import theme from "../theme";
import UserGreeting from "../components/userGreeting";
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import ChallengesActive from "./challengesActive";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Challenges = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isOverlayVisible2, setIsOverlayVisible2] = useState(false);
    const [activeChallengesExist, setActiveChallengesExist] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const [userData, setUserData] = useState({});
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
                    'comop-api-key': COMOP_API_KEY,
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
        navigation.navigate('challengesActive', { challenge: activeChallenge, userData });
    }

    const handlePress = () => {
        setIsOverlayVisible(!isOverlayVisible);
        console.log(isOverlayVisible);
    };

    const handlePress2 = () => {
        setIsOverlayVisible2(!isOverlayVisible2);
        console.log(isOverlayVisible2);
    };

    const handleNavigate = () => {
        navigation.navigate('challengesCategoryOne');
    }
    const handleNavigate2 = () => {
        navigation.navigate('challengesCategoryTwo');
        console.log("Navigating to challengesCategoryTwo");
    }

    return (
        <View style={styles.challengeStyle}>
            <Logo />
            <ScrollView showsVerticalScrollIndicator={false}>
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
            </View>
            <View style={styles.categoryStyle2}>
                <View style={styles.imgWrapper}>
                    <TouchableOpacity onPress={handleNavigate2}>
                        <Image source={require("../assets/images/imgCategory1.png")} style={styles.image} />
                    </TouchableOpacity>
                    {isOverlayVisible2 && 
                    <View style={styles.overlay2}>
                        <Text style={styles.overlayTitle}>Motivational challenges</Text>
                        <Text style={styles.overlayBody}>"Unlock and conquer fitness goals with 'Comop.' Join a supportive community, embrace change, and unleash your inner champion."</Text>
                    </View>}
                    <TouchableWithoutFeedback onPress={handlePress2}>
                        <View style={[styles.corner2, isOverlayVisible2 && styles.transparentCorner]}>
                            {isOverlayVisible2 ? (
                                <Image style={styles.imgInfoCross} source={require("../assets/icons/blackCrossIcon.png")} />
                            ) : (
                                <Image style={styles.imgInfo} source={require("../assets/icons/blackIconInfo.png")} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.colorBox2} onPress={handleNavigate2}>
                        {!isOverlayVisible2 && <Text style={styles.colorBox2Text}>Motivational challenges</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
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

    categoryStyle2: {
        paddingTop: 20,
        paddingBottom: 100,
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

    colorBox2: {
        backgroundColor: "#6CC2FF",
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
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    colorBox2Text: {
        paddingLeft: 20,
        color: "#1C1B1B",
        textAlign: "left",
        ...theme.textStyles.customTitle,
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

    corner2: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 112,
        borderTopWidth: 83,
        borderLeftColor: 'transparent',
        borderTopColor: '#6CC2FF',
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

    overlay2: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 350,
        height: 250,
        backgroundColor: "#6CC2FF",
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
        ...theme.textStyles.customTitle,
        fontSize: 20,
        marginBottom: 20,
    },

    overlayBody: {
        color: "#1C1B1B",
        textAlign: "center",
        ...theme.textStyles.customText,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default Challenges;