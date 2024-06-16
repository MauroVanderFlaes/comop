import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';
import { IPADRESS, prod, render } from '../config';

const noRewardMessage = () => (
    <View style={styles.containerRewards}>
        <Text style={styles.title}>You have no rewards yet</Text>
    </View>
);

const FitpassMyRewards = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null); // State to hold userId
    const [userData, setUserData] = useState(null); // State to hold user data
    const [rewards, setRewards] = useState([]); // State to hold user rewards
    const [error, setError] = useState(null); // State to hold error message if any

    const fetchUserData = async (userId) => {
        console.log('Fetching user data with rewards for user ID:', userId);
        try {
            let url;
            if (prod) {
                url = `${render}/api/v1/users/rewards/${userId}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/users/rewards/${userId}`;
            }

            const response = await fetch(url);
            const result = await response.json();
            if (response.ok) {
                setUserData(result.data.user);
                setRewards(result.data.user.rewards);
                console.log('User data with rewards:', result.data.user);
            } else {
                console.error('Failed to fetch user data with rewards:', result.message);
                setError(result.message);
            }
        } catch (error) {
            console.error('Error fetching user data with rewards:', error);
            setError('Error fetching user data with rewards');
        }
    };

    // useEffect to fetch userId from AsyncStorage on mount
    useEffect(() => {
        const retrieveUserId = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    console.log('User data retrieved in FitpassMyReward:', user);
                    setUserId(user._id); // Set the userId state
                }
            } catch (error) {
                console.error('Error retrieving user data in FitpassMyReward:', error);
            }
        };

        retrieveUserId();
    }, []); // Empty dependency array ensures it runs once on mount

    // useEffect to fetch user data and rewards when userId changes
    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        }
    }, [userId]); // Dependency array ensures it runs whenever userId changes

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                    <Logo />
                <View style={styles.innerContainer}>
                    <View style={styles.boxTitle}>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>Here are your deserved rewards</Text>
                    </View>
                    {rewards.length === 0 ? (
                        noRewardMessage()
                    ) : (
                        <View style={styles.rewards}>
                            {rewards.map((reward) => (
                                <TouchableOpacity
                                    key={reward._id}
                                    style={styles.rewardBox}
                                    onPress={() => navigation.navigate("fitpassMyReward", { reward })}
                                >
                                    <View style={styles.rewardBoxContent}>
                                        <View style={styles.reward}>
                                            <Image
                                                source={{ uri: reward.imageUrl }} // Assuming reward has an image_url field
                                                style={styles.image5}
                                            />
                                            <View style={styles.circleBig}></View>
                                        </View>
                                        <View>
                                            <Text style={styles.Title}>{reward.name}</Text>
                                            <Text style={styles.Text}>Click to view reward</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
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
        // alignItems: "center",
    },
    arrowBack: {
        top: 80,
        left: 8,
    },
    rewards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20,
    },
    rewardBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.offblack,
        width: 350,
        height: 180,
        borderRadius: 15,
    },
    rewardBoxContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginHorizontal: 20,
    },
    reward: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBig: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.blue_dark,
    },
    image5: {
        position: 'absolute',
        width: 62,
        height: 82,
        zIndex: 1,
    },
    Title: {
        ...theme.textStyles.customTitle,
        fontSize: 22,
        textAlign: "center",
        color: "#F2F2F2",
    },
    Text: {
        ...theme.textStyles.customText,
        fontSize: 16,
        textAlign: "center",
        color: "#F2F2F2",
    },
    title: {
        fontSize: 20,
        ...theme.textStyles.customText,
        color: theme.colors.red,
    },

    containerRewards: {
        position: 'relative',
        top: 200,

    },

    boxTitle: {
        display: 'flex',
        alignItems: "flex-start",
        marginLeft: 8,
    }
});

export default FitpassMyRewards;
