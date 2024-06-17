import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import ArrowBack from '../components/arrowBack';
import Nav from '../components/nav';
import UserGreeting from '../components/userGreeting';
import Logo from '../components/logo';
import theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';


const ChallengesDetails = ({ route }) => {
    const { challenge } = route.params;
    // console.log('Challengessss:', challenge);
    const navigation = useNavigation();

    // console.log('Challenge:', challenge);
    const [userData, setUserData] = useState({});
    console.log('User data detaill:', userData);

    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    console.log('User data retrieved:', user);
                    setUserData(user);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        retrieveUserData();
    }, []);

    const handleStartChallenge = async () => {
        console.log('Starting challenge');
        let url = `${render}/api/v1/challenges/active/${challenge._id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'comop-api-key': COMOP_API_KEY,
                },
                body: JSON.stringify({ userId: userData._id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Challenge activated:', result);

            navigation.navigate('challengesCountdown', { challenge, userData });
        } catch (error) {
            console.error('Error activating challenge:', error);
        }
    };

    // get async storage data of user
   

    return (
        <View style={styles.container}>
            <Logo />
                <ArrowBack style={styles.arrowBack} />
                <View style={styles.innerContainer}>

                <View style={styles.leftImageContainer}>
                    <Image source={require('../assets/images/linesLeftImg.png')} style={styles.leftImage} />
                </View>

                <View style={styles.rightImageContainer}>
                    <Image source={require('../assets/images/linesRightImg.png')} style={styles.rightImage} />
                </View>

                    <View style={styles.titleBox}>
                        <Text style={theme.textStyles.NameTitle}>{challenge.title}</Text>
                        <Text style={theme.textStyles.customSubtitle}>Go get it {userData.username}!</Text>
                    </View>
                    
                    <View style={styles.boxImg}>
                        <View style={styles.boxTitle}>
                            <Text style={styles.verticalText}>{challenge.title}</Text>
                        </View>
                        <View style={styles.imgBox}>
                            <Image source={{ uri: challenge.imageUrl }} style={styles.challengeImg} />
                        </View>
                    </View>
                    <View style={styles.boxDescription}>
                        <Text style={styles.challengeDescription}>{challenge.description}</Text>
                    </View>
                    <View style={styles.hrsBox}>
                        <Text style={styles.challengeTime}>{challenge.time} hrs left</Text>
                    </View>

                    <View style={styles.boxCredits}>
                        <Text style={styles.textCredits}>CREDITS: {challenge.credits}</Text>
                    </View>


                    <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                        style={styles.buttonChallenge}
                        onPress={handleStartChallenge}
                    >
                        <Text style={styles.buttonText}>{`Go get it ${userData.username}!`}</Text>
                    </TouchableOpacity>
                    </View>                   
                    
                </View>
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
    innerContainer: {
        paddingTop: 130,
    },

    challengeImg:{
        width: 298,
        height: 223,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

    arrowBack: {
        top: 80,
        left: 20,
    },

    boxImg: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        marginTop: 20,
        marginBottom: 20,
    },

    boxTitle: {
        width: 52,
        height: 223,
        backgroundColor: '#FFB952',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    verticalText: {
        transform: [{ rotate: '270deg' }],
        textAlign: 'center',
        width: 223,
        color: '#1C1B1B',
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    titleBox: {
        paddingLeft: 10,
    },

    challengeDescription: {
        width: 350,
        
        color: '#1C1B1B',
        textAlign: 'center',
        ...theme.textStyles.customText,
        marginBottom: 10,
        fontSize: 16,
    },

    hrsBox: {
        position: 'absolute',
        top: 390,
        right: 15,
        // backgroundColor: '#f2f2f2',
        color: '#f2f2f2',
        padding: 8,
        borderRadius: 20,
    },

    challengeTime: {
        color: '#f2f2f2',
        ...theme.textStyles.customText,
    },

    customSubtitle: {
        color: '#1C1B1B',
        ...theme.textStyles.customSubtitle,
        fontSize: 16,
    },

    boxCredits: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textCredits: {
        ...theme.textStyles.customTitle,
        fontSize: 20,
    },

    buttonChallenge: {
        backgroundColor: '#1C1B1B',
        width: 242,
        height: 48,
        borderRadius: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },

    buttonText: {
        color: '#F2F2F2',
        ...theme.textStyles.customSubtitle,
        fontSize: 16,
    },

    ButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    leftImageContainer: {
        position: 'absolute',
        top: 500,
        left: -90,
        zIndex: 1,
    },

    leftImage: {
        height: 56,
        width: 160,
    },

    rightImageContainer: {
        position: 'absolute',
        top: 600,
        right: -140,
        zIndex: 1,
    },

    rightImage: {
        height: 40,
        width: 216,
    },

});

export default ChallengesDetails;
