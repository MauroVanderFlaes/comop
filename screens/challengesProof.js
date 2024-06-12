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

const ChallengesProof = ({ route }) => {
    const { challenge } = route.params;
    const [challenges, setChallenges] = useState([]);
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const requiredImages = challenge.requiredImages;
    

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

    const renderSteps = () => {
        switch (requiredImages) {
            case 1:
                return (
                    <View style={styles.stepsBox}>
                        <View style={styles.circleOne}>
                            <Text style={styles.circleOneText}>1</Text>
                        </View>
                        <View style={styles.lineOne}></View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepsBox}>
                        <View style={styles.circleOne}>
                            <Text style={styles.circleOneText}>1</Text>
                        </View>
                        <View style={styles.lineOne}></View>
                        <View style={styles.circleTwo}>
                            <Text style={styles.circleTwoText}>2</Text>
                        </View>
                        <View style={styles.lineTwo}></View>
                        <View style={[styles.lineThree, requiredImages === 2 && styles.lineThreeTopAdjusted]}></View>
                    </View>
                );
                
            case 3:
                return (
                    <View style={styles.stepsBox}>
                        <View style={styles.circleOne}>
                            <Text style={styles.circleOneText}>1</Text>
                        </View>
                        <View style={styles.lineOne}></View>
                        <View style={styles.circleTwo}>
                            <Text style={styles.circleTwoText}>2</Text>
                        </View>
                        <View style={styles.lineTwo}></View>
                        <View style={styles.circleThree}>
                            <Text style={styles.circleThreeText}>3</Text>
                        </View>
                        <View style={styles.lineThree}></View>
                        <View style={styles.lineFour}></View>
                        <View style={styles.lineFive}></View>
                    </View>
                );
            default:
                return null;
        }
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

                {renderSteps()}

                <View style={[styles.boxTexts, requiredImages === 2 && { height: 120 }]}>
                    <View style={styles.boxTextOne}>
                        <Text style={styles.firstPic}>First, we need a picture of your:</Text>
                        <Text style={styles.firstPicText}>{challenge.imageDescriptions[0]}</Text>
                    </View>
                    {requiredImages >= 2 && (
                        <View style={styles.boxTextTwo}>
                            <Text style={styles.secondPic}>Second, we need a picture of your:</Text>
                            <Text style={styles.secondPicText}>{challenge.imageDescriptions[1]}</Text>
                        </View>
                    )}
                    {requiredImages === 3 && (
                        <View style={styles.boxTextTree}>
                            <Text style={styles.thirdPic}>And lastly, we need a picture of your:</Text>
                            <Text style={styles.thirdPicText}>{challenge.imageDescriptions[2]}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.boxDescription}>
                    
                </View>


                <TouchableOpacity style={styles.nextButton}>
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
        width: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

      },

      stepsBox: {
            // place this view in the middle of the screen
            position: 'absolute',
            top: "59%",
            left: 0,
      },
      
        circleOne: {
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: '#80F075',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,

        },

        circleOneText: {
            color: '#1C1B1B',
            fontFamily: 'AzoSans-Bold',
            fontSize: 14,
        },

        // line in the middle and to the right of circle 1
        lineOne: {
            width: 22,
            height: 5,
            backgroundColor: '#80F075',
            position: 'relative',
            top: -16,
            left: 14,
            borderRadius: 20,
        },

        // line in the middle and bottom of circle 1
        lineTwo: {
            width: 5,
            height: 56,
            backgroundColor: '#80F075',
            position: 'relative',
            top: -36,
            left: 12,
            borderRadius: 20,
        },

        // circle 2 at the bottom of line 2
        circleTwo: {
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: '#80F075',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            top: 40,
            left: 0,
            zIndex: 1,
        },

        circleTwoText: {
            color: '#1C1B1B',
            fontFamily: 'AzoSans-Bold',
            fontSize: 14,
        },

        // line in the middle and to the right of circle 2
        lineThree: {
            width: 22,
            height: 5,
            backgroundColor: '#80F075',
            position: 'relative',
            top: -62,
            left: 14,
            borderRadius: 20,
        },

        lineThreeTopAdjusted: {
            top: -32,
        },

        // line in the middle and bottom of circle 2
        lineFour: {
            width: 5,
            height: 56,
            backgroundColor: '#80F075',
            position: 'relative',
            top: -56,
            left: 12,
            borderRadius: 20,
        },

        // circle 3 at the bottom of line 3
        circleThree: {
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: '#80F075',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            top: 28,
            left: 0,
            zIndex: 1,
        },

        circleThreeText: {
            color: '#1C1B1B',
            fontFamily: 'AzoSans-Bold',
            fontSize: 14,
        },

        // line in the middle and to the right of circle 3
        lineFive: {
            width: 22,
            height: 5,
            backgroundColor: '#80F075',
            position: 'relative',
            top: -50,
            left: 14,
            borderRadius: 20,
        },

        boxTexts: {
            // display: 'flex',
            // justifyContent: 'space-between',
            justifyContent: 'space-between',
            position: 'absolute',
            alignItems: 'center',
            // height: requiredImages === 2 ? 100 : 184,
            height: 184,
            top: "60%",
        },  

        boxTextOne: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },

        boxTextTwo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },

        boxTextTree: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',  
        },

        firstPic: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-regular',
            marginBottom: 4,
        },

        firstPicText: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-bold',
            marginBottom: 4,
        },

        secondPic: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-regular',
            marginBottom: 4,
        },

        secondPicText: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-bold',
            marginBottom: 4,
        },


        thirdPic: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-regular',
            marginBottom: 4,
        },

        thirdPicText: {
            fontSize: 16,
            color: '#1C1B1B',
            fontFamily: 'AzoSans-bold',
            marginBottom: 4,
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
        height: 100,

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
            marginTop: 100,
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

export default ChallengesProof;
