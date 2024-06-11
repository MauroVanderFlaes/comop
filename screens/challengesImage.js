import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '../components/logo';
import { useNavigation } from '@react-navigation/native';
import UserGreeting from '../components/userGreeting';
import theme from '../theme';
import Nav from '../components/nav';
import { IPADRESS, prod, render } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowBack from '../components/arrowBack';

const ChallengesImage = ({ route }) => {
    const { challenge } = route.params;
    const [challenges, setChallenges] = useState([]);
    const navigation = useNavigation();
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

    goToChallengesProof = () => {
        navigation.navigate('challengesProof', { challenge, userData });
    };
    


    return (
        <View style={styles.container}>
          <Logo />
            <ArrowBack style={styles.arrowBack} />
                <View style={styles.titleBox}>
                    <View style={styles.titleText}>
                    <Text style={theme.textStyles.NameTitle}>{challenge.title}</Text>
                    <Text style={theme.textStyles.customSubtitle}>Almost there {userData?.username || 'User'}!</Text>
                    </View>
                </View>
            
    
            <View style={styles.innerContainer}>
                <View style={styles.imgBox}>
                    <Image source={require('../assets/images/stepsImg1.png')} style={styles.challengeImg} />
                </View>
                <View style={styles.boxDescription}>
                    <Text style={styles.challengeDescription}>Hey {userData?.username}, we need some confirmation that you have officially completed ever part of the challenge.</Text>
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={goToChallengesProof}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                
            </View>
          <Nav />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
      },
      innerContainer: {
        paddingTop: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

      },
      cancelButton: {
        // position: 'absolute',
        // top: 0, // Adjust this value according to your layout
        // right: 0, // Adjust this value according to your layout
        // zIndex: 1,
        position: 'relative',
        top: 100,
        left: 144,
        zIndex: 1,
    
      },
      cancelButtonText: {
        fontSize: 16,
        color: '#1C1B1B',
        fontFamily: 'AzoSans-Bold',
      },
      challengeImg: {
        width: 200,
        height: 100,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        resizeMode: 'contain',
      },

      arrowBack: {
        top: 80,
        left: 20,
      },

      imgBox: {
        marginTop: 20,
        width: 200,
        height: 200,

      },
     
      boxDescription: {
        display: 'flex',
        justifyContent: 'top',
        alignItems: 'center',
        height: 200,
      },
      
      challengeDescription: {
        width: 350,
        fontSize: 16,
        color: '#1C1B1B',
        textAlign: 'center',
        fontFamily: 'AzoSans-regular',
        marginBottom: 10,
      },
      
    
      titleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        position: 'relative',
        top: 130,
        left: 20,
        width: 380,
      },
    
      titleText: {
        
      },
    
    
    
        completed: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        },

        nextButton: {
            width: 242,
            height: 48,
            backgroundColor: '#1C1B1B',
            borderRadius: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        nextText: {
            color: '#F2F2F2',
            fontSize: 16,
            fontFamily: 'AzoSans-bold',
        },

        skipText: {
            color: '#1C1B1B',
            fontSize: 16,
            fontFamily: 'AzoSans-bold',
            marginTop: 20,
        }

    
});

export default ChallengesImage;
