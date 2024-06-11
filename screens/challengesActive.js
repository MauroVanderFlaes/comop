import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '../components/logo';
import { useNavigation } from '@react-navigation/native';
import UserGreeting from '../components/userGreeting';
import theme from '../theme';
import Nav from '../components/nav';
import { IPADRESS, prod, render } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChallengesActive = ({ route }) => {
  const { challenge } = route.params;
  const [challenges, setChallenges] = useState([]);
  const [userData, setUserData] = useState({});
  console.log('Challengeeeee:', challenge);
  const navigation = useNavigation();
  console.log('User dataaaa:', userData);

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
            



    const goToChallengeProof = () => {
        navigation.navigate('challengesImage', { challenge, userData });
    };



  const handleCancel = () => {
    // update the challenge to be inactive with a put request
    let url;
    if (prod) {
        url = `${render}/api/v1/challenges/active/${challenge._id}`;
    } else {
        url = `http://${IPADRESS}:3000/api/v1/challenges/active/${challenge._id}`;
    }
    console.log('Canceling challenge:', url);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: false }),
    })

    navigation.navigate('challenges');
};




    // navigation.navigate('challengesDetails', { challenge });

//   console.log('Challenge:', challenge);

//   do an api call to get the active challenge and display it in challenge variable
    useEffect(() => {
        const fetchData = async () => {
            let url;
            if (prod) {
                url = `${render}/api/v1/challenges/active/`;
            } else {
                url = `http://${IPADRESS}:3000/api/v1/challenges/active/`;
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
                    console.log(data.data);
                    setChallenges(data.data);
    
                } else {
                    const errorData = await response.json();
                    console.log("Error fetching challenges:", errorData.message);
                }
            } catch (error) {
                console.log("Error fetching challenges:", error);
            }
        };
        fetchData();
    }, []);



  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.titleBox}>
        <View style={styles.titleText}>
          <Text style={theme.textStyles.NameTitle}>{challenge.title}</Text>
          <Text style={theme.textStyles.customSubtitle}>Go get it {userData?.username || 'User'}!</Text>
        </View>
      </View>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View style={styles.leftImageContainer}>
          <Image source={require('../assets/images/linesLeftImg.png')} style={styles.leftImage} />
        </View>
        <View style={styles.rightImageContainer}>
          <Image source={require('../assets/images/linesRightImg.png')} style={styles.rightImage} />
        </View>
        <View style={styles.boxImg}>
          <View style={styles.imgBox}>
            <Image source={{ uri: challenge.imageUrl }} style={styles.challengeImg} />
            <View style={styles.overlay}>
              <Text style={styles.completingText}>Completing challenge</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxDescription}>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
        </View>
        <View style={styles.boxCredits}>
          <Text style={styles.textCredits}>Credits: {challenge.credits}</Text>

        </View>
        <View style={styles.completed}>
          <TouchableOpacity style={styles.boxButton} onPress={goToChallengeProof}>
            <Text style={styles.textButton}>Completed</Text>
          </TouchableOpacity>
        </View>


      </View>
        <View style={styles.warningBox}>
            <Text style={styles.warningText}>Don't forget to take a picture while doing your challenge {userData.username}!</Text>
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
  },
  cancelButton: {
    // position: 'absolute',
    // top: 0, // Adjust this value according to your layout
    // right: 0, // Adjust this value according to your layout
    // zIndex: 1,
    position: 'relative',
    top: 110,
    left: 144,
    zIndex: 1,

  },
  cancelButtonText: {
    fontSize: 16,
    color: '#1C1B1B',
    fontFamily: 'AzoSans-Bold',
  },
  challengeImg: {
    width: 350,
    height: 223,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    opacity: 0.2
  },
  boxImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  boxTitle: {
    marginTop: 100,
    backgroundColor: '#FFB952',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalText: {
    textAlign: 'center',
    width: 223,
    fontSize: 20,
    color: '#1C1B1B',
    fontWeight: 'bold',
    fontFamily: 'AzoSans-bold',
  },
  challengeDescription: {
    width: 350,
    fontSize: 16,
    color: '#1C1B1B',
    textAlign: 'center',
    fontFamily: 'AzoSans-regular',
    marginBottom: 10,
  },
  
  challengeTime: {
    fontSize: 16,
    color: '#f2f2f2',
    fontFamily: 'AzoSans-regular',
  },
  boxCredits: {
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCredits: {
    fontFamily: 'AzoSans-regular',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftImageContainer: {
    position: 'absolute',
    top: 180,
    left: -90,
    zIndex: 1,
  },
  leftImage: {
    height: 56,
    width: 160,
  },
  rightImageContainer: {
    position: 'absolute',
    top: 300,
    right: -140,
    zIndex: 1,
  },
  rightImage: {
    height: 40,
    width: 216,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completingText: {
    fontSize: 20,
    color: '#1C1B1B',
    fontFamily: 'AzoSans-Bold',
  },

  imgBox: {
    width: 350,
    height: 223,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',

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

  boxButton: {
    width: 242,
    height: 48,
    backgroundColor: '#1C1B1B',
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    

  },

    textButton: {
        color: '#F2F2F2',
        fontSize: 16,
        fontFamily: 'AzoSans-bold',
    },

    completed: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    warningBox: {
        width: 340,
        height: 68,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: '#6CC2FF',
        borderRadius: 36,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: 'absolute',
        top: 36
    },
    
    warningText: {
        fontSize: 16,
        color: '#1C1B1B',
        fontFamily: 'AzoSans-regular',
        textAlign: 'center',
    },


});

export default ChallengesActive;
