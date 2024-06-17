import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Nav from "../components/nav";
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import Logo from "../components/logo";
import theme from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Fitpass = () => {
    const [userData, setUserData] = useState(null);
    const [credits, setCredits] = useState(null);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const scrollViewRef = useRef(null);
    const [rewards, setRewards] = useState([]); 
    const navigation = useNavigation();

    const fetchUserCredits = useCallback(async (userId) => {
        console.log('Fetching user credits for user ID:', userId);
        try {
            let url;
            if (prod) {
                url = `${render}/api/v1/users/credits/${userId}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/users/credits/${userId}`;
            }

            const response = await fetch(url, { headers: { 'comop-api-key': COMOP_API_KEY } });
            const result = await response.json();
            if (response.ok) {
                setCredits(result.data.credits);
            } else {
                console.error('Failed to fetch credits:', result.message);
                setError(result.message);
            }
        } catch (error) {
            console.error('Error fetching user credits:', error);
            setError('Error fetching user credits');
        }
    }, []);

    const fetchRewards = useCallback(async (gymId) => {
        console.log('Api key', COMOP_API_KEY);
        try {
            let url;
            if (prod) {
                url = `${render}/api/v1/rewards/${gymId}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/rewards/${gymId}`;
            }

            const response = await fetch(url, { headers: { 'comop-api-key': COMOP_API_KEY } });
            console.log('Response:', response);

            if (!response.ok) {
                // Log extra information for a failed status
                const errorText = await response.text();
                console.error('Failed to fetch rewards:', response.status, errorText);
                setError(`Failed to fetch rewards: ${response.status}`);
                return;
            }

            const result = await response.json();
            console.log('Fetched rewards:', result.data.rewards);
            setRewards(result.data.rewards);
        } catch (error) {
            console.error('Error fetching rewards:', error);
            setError('Error fetching rewards');
        }
    }, []);

    const retrieveUserData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                const user = JSON.parse(value);
                console.log('User data retrieved:', user);
                setUserData(user);
                console.log('User ID:', user._id);
                await fetchUserCredits(user._id);
                fetchRewards(user.gymId); // Assuming user.gymId is available
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    }, [fetchUserCredits, fetchRewards]);

    useEffect(() => {
        retrieveUserData();
    }, [retrieveUserData]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (userData) {
                fetchUserCredits(userData._id);
            }
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: false });
            }
        });

        return unsubscribe;
    }, [navigation, userData, fetchUserCredits]);

    const onRefresh = async () => {
        setRefreshing(true);
        if (userData) {
            await fetchUserCredits(userData._id);
        }
        setRefreshing(false);
    };

    return (
        <View style={styles.fitpassStyle}>
            <View style={styles.Icons}>
                <TouchableOpacity onPress={() => navigation.navigate("fitpassInfo")}><Image source={require("../assets/icons/blackIconInfo.png")} style={styles.Icon} /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("fitpassMyRewards")}><Image source={require("../assets/icons/myRewards.png")} style={styles.Icon2} /></TouchableOpacity>
            </View>
            <Logo />
            <View style={styles.boxFitpass}>
                {error ? (
                    <Text style={styles.Text}>Error: {error}</Text>
                ) : (
                    <Text style={styles.Text}>
                        {credits !== null ? `${credits} Credits` : "Loading..."}
                    </Text>
                )}
                <ScrollView 
                    ref={scrollViewRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.containers}>
                        {rewards
                            .slice() // create a copy to avoid mutating state directly
                            .sort((a, b) => b.credits - a.credits) // sort by credits descending
                            .map((reward, index) => (
                                <View key={reward._id}>
                                    <View style={index % 2 === 0 ? styles.container : styles.container2}>
                                        <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward", { reward })}>
                                            <Image
                                                source={{ uri: reward.imageUrl }}
                                                style={styles.image}
                                            />
                                            <View style={styles.circleBig}></View>
                                        </TouchableOpacity>
                                    </View>
                                    {index < rewards.length - 1 && <View style={index % 2 === 0 ? styles.line3 : styles.line2} />}
                                    {index === rewards.length - 1 && <View style={styles.line1} />}
                                </View>
                            ))}
                        <View style={styles.start}>
                            <View style={styles.circle}></View>
                            <Text style={styles.Text}>Start</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Nav />
        </View>
    );
};

const styles = {
    fitpassStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    Icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        //marginTop: -60,
        marginBottom: 20,
    },

    Icon: {
        width: 40,
        height: 40,
    },

    Icon2: {
        width: 40,
        height: 52,
    },

    Text: {
        ...theme.textStyles.customTitle,
        textAlign: "center",
        color: "#F2F2F2",
    },

    boxFitpass: {
        width: "90%",
        maxHeight: "70%",
        backgroundColor: "#1C1B1B",
        color: "#F2F2F2",
        borderRadius: 15,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    },

    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: theme.colors.blue_light,
    },

    containers: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 60,
    },

    line1: {
        height: 10,
        marginLeft: 60,
        marginBottom: 50,
        width: '45%',
        backgroundColor: theme.colors.blue_light,
        transform: [{ rotate: '65deg' }],
        zIndex: 1,
      },

      line2: {
        height: 10,
        marginLeft: 100,
        marginBottom: 0,
        width: '45%',
        backgroundColor: theme.colors.blue_light,
        transform: [{ rotate: '-35deg' }],
        zIndex: 1,
      },

      line3: {
        height: 10,
        marginLeft: 100,
        marginBottom: 0,
        width: '45%',
        backgroundColor: theme.colors.blue_light,
        transform: [{ rotate: '35deg' }],
        zIndex: 1,
      },

    container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginLeft: 20,
        zIndex: 2,
    },

    container2: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        marginRight: 20,
        zIndex: 2,
    },

    start: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    circleBig: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.blue_light,
    },

    reward: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        position: 'absolute',
        width: 120, // Pas de afmetingen naar wens aan
        height: 120, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    circleBig: {
        width: 120,
        height: 120,
        borderRadius: 80,
        backgroundColor: theme.colors.offwhite,
    },

    leftImageContainer1: {
        position: 'absolute',
        top: 680,
        left: -80,
        zIndex: 4,
      },
      leftImage: {
        height: 56,
        width: 160,
        zIndex: 4,
      },

    rightImageContainer1: {
        position: 'absolute',
        top: 1150,
        right: -110,
        zIndex: 4,
    },

    rightImageContainer2: {
        position: 'absolute',
        top: 300,
        right: -110,
        zIndex: 4,
    },

    rightImage: {
        height: 40,
        width: 216,
        zIndex: 4,
    },


};

export default Fitpass;
