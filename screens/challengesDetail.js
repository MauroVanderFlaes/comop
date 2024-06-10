import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import ArrowBack from '../components/arrowBack';
import Nav from '../components/nav';
import UserGreeting from '../components/userGreeting';
import Logo from '../components/logo';
import theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChallengesDetails = ({ route }) => {
    const { challenge } = route.params;

    console.log('Challenge:', challenge);
    const [userData, setUserData] = useState({});

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

    // get async storage data of user
   

    return (
        <View style={styles.container}>
            <Logo />
                <View style={styles.innerContainer}>
            <ArrowBack style={styles.ArrowBack} />
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
                    <Text style={styles.challengeDescription}>{challenge.description}</Text>
                    <View style={styles.hrsBox}>
                        <Text style={styles.challengeTime}>{challenge.time} hrs left</Text>
                    </View>

                    <View style={styles.boxCredits}>
                        <Text style={styles.textCredits}>CREDITS: {challenge.credits}</Text>
                    </View>


                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.buttonChallenge}
                            onPress={() => {
                                // handle button press
                            }}
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
        fontSize: 20,
        color: '#1C1B1B',
        fontWeight: 'bold',
        fontFamily: 'AzoSans-bold',
    },

    titleBox: {
        paddingLeft: 10,
    },

    challengeDescription: {
        width: 350,
        fontSize: 16,
        color: '#1C1B1B',
        textAlign: 'left',
        fontFamily: 'AzoSans-regular',
        marginBottom: 10,
    },

    hrsBox: {
        position: 'absolute',
        top: 390,
        right: 15,
        backgroundColor: '#FFB952',
        padding: 8,
        borderRadius: 20,
    },

    challengeTime: {
        fontSize: 16,
        color: '#1C1B1B',
        fontWeight: 'regular',
        fontFamily: 'AzoSans-regular',
    },

    customSubtitle: {
        fontSize: 16,
        color: '#1C1B1B',
        fontFamily: 'AzoSans-regular',
    },

    boxCredits: {
        marginTop: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textCredits: {
        fontFamily: 'AzoSans-regular',
        fontWeight: 'bold',
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
        fontSize: 16,
        fontFamily: 'AzoSans-bold',
    },

    ButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
});

export default ChallengesDetails;
