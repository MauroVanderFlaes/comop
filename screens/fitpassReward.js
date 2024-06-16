import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { IPADRESS, prod, render } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FitpassMyReward = () => {
    const route = useRoute();
    const { reward } = route.params;

    const [userCredits, setUserCredits] = useState(100); // Example: user has 100 credits
    const [userId, setUserId] = useState(null); // State to hold userId
    const navigation = useNavigation();

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

    const buyReward = async () => {
        try {
            if (!userId) {
                console.error('User ID is not available.');
                return; // Handle the case where userId is not available
            }

            const rewardId = reward._id;

            let url;
            if (prod) {
                url = `${render}/api/v1/rewards/buy/${rewardId}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/rewards/buy/${rewardId}`;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Ensure userId is passed in the body
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Reward purchased successfully:', result.data.user);
                // navigate to fitpass screen
                navigation.navigate('fitpass');
                // Handle success as needed
            } else {
                // console.error('Failed to purchase reward:', result.message);
                Alert.alert('Failed to purchase reward:', result.message);
                // Handle failure as needed
            }
        } catch (error) {
            // console.error('Error purchasing reward:', error);
            Alert.alert(`Error purchasing reward: ${error.message}`)
            // Handle error as needed
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                <View style={styles.innerContainer}>
                    <Logo />
                    <View>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>This is a great choice!</Text>
                    </View>
                    <View style={styles.rewards}>
                        <View style={styles.reward}>
                            <Image
                                source={{ uri: reward.imageUrl }}
                                style={styles.image5}
                            />
                            <View style={styles.circleBig}></View>
                        </View>
                        <View>
                            <Text style={styles.Title}>{reward.name}</Text>
                            <Text style={styles.SubTitle}>Credits: {reward.credits}</Text>
                            <View style={styles.goal}>
                                <Text style={styles.goalSubTitle}>Goal</Text>
                                <Text style={styles.goalText}>{reward.goal}</Text>
                            </View>
                            <View style={styles.goal}>
                                <Text style={styles.goalSubTitle}>Benefits</Text>
                                <Text style={styles.goalText}>{reward.benefits}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={buyReward}>
                            <Text style={theme.buttonStyles.buttonText}>Buy this reward</Text>
                        </TouchableOpacity>
                    </View>
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
    arrowBack: {
        top: 80,
        left: 20,
    },
    rewards: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        gap: 20,
    },
    reward: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    goal: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10,
        marginTop: 20,
    },
    circleBig: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: theme.colors.blue_dark,
    },
    image5: {
        position: 'absolute',
        width: 90,
        height: 120,
        zIndex: 1,
    },
    Title: {
        ...theme.textStyles.customTitle,
        fontSize: 22,
        textAlign: "center",
        color: theme.colors.offblack,
    },
    SubTitle: {
        ...theme.textStyles.customSubtitle,
        fontSize: 18,
        textAlign: "center",
        color: theme.colors.offblack,
    },
    goalSubTitle: {
        paddingLeft: 20,
        fontWeight: "bold",
        ...theme.textStyles.customSubtitle,
        fontSize: 18,
        color: theme.colors.offblack,
    },
    goalText: {
        paddingLeft: 20,
        paddingRight: 20,
        ...theme.textStyles.customText,
        fontSize: 16,
        textAlign: "left",
        color: theme.colors.offblack,
    },
});

export default FitpassMyReward;
