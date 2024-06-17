import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { useRoute } from '@react-navigation/native';
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FitpassReward = () => {
    const route = useRoute();
    const { reward } = route.params;
    const [userId, setUserId] = useState(null); // State to hold userId
    const navigation = useNavigation();

    // useEffect to fetch userId from AsyncStorage on mount
    useEffect(() => {
        const retrieveUserId = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    console.log('User data retrieved in FitpassReward:', user);
                    setUserId(user._id); // Set the userId state
                }
            } catch (error) {
                console.error('Error retrieving user data in FitpassReward:', error);
            }
        };

        retrieveUserId();
    }, []); // Empty dependency array ensures it runs once on mount

    // Ensure reward is properly passed and received
    console.log('Reward:', reward);

    // api call to remove reward
    const removeReward = async () => {
        if (!userId) {
            console.error('User ID not available.');
            Alert.alert('Error', 'User ID not available. Please try again.');
            return;
        }

        try {
            let url;
            if (prod) {
                url = `${render}/api/v1/users/rewards/${userId}/${reward._id}`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/users/rewards/${userId}/${reward._id}`;
            }

            const response = await fetch(url, {
                method: 'DELETE',
                'comop-api-key': COMOP_API_KEY,
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Reward removed:', result.message);
                // Navigate to FitpassMyRewards screen
                navigation.navigate('fitpass');
            } else {
                console.error('Failed to remove reward:', result.message);
                Alert.alert('Failed to remove reward:', result.message);
            }
        } catch (error) {
            console.error('Error removing reward:', error);
            Alert.alert('Error removing reward:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                <Logo />
                <View style={styles.innerContainer}>
                    <View style={styles.boxTitle}>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>Here is your claimed reward</Text>
                    </View>
                    <View style={styles.rewards}>
                        <View style={styles.reward}>
                            <Image
                                source={{ uri: reward.imageUrl }} // Assuming reward has an image_url field
                                style={styles.image5}
                            />
                            <View style={styles.circleBig}></View>
                        </View>
                        <View>
                            <Text style={styles.Title}>{reward.name}</Text>
                            <Text style={styles.Text}>
                                Ask your fitness staff for your reward. They will give you your deserved {reward.name}.
                            </Text>
                        </View>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={removeReward}>
                            <Text style={theme.buttonStyles.buttonText}>I got my reward</Text>
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
        width: 375,
        // alignItems: "center",
    },
    arrowBack: {
        top: 80,
        left: 20,
    },

    rewards: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        gap: 20,
    },

    reward: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
        marginBottom: 12,
        fontSize: 22,
        textAlign: "center",
        color: theme.colors.offblack,
    },

    Text: {
        ...theme.textStyles.customText,
        // paddingLeft: 20,
        // paddingRight: 20,
        fontSize: 16,
        textAlign: "center",
        color: theme.colors.offblack,
        marginBottom: 20,
    },

    boxTitle: {
        marginLeft: 20,
    }
});

export default FitpassReward;
