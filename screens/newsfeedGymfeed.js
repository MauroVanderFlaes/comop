import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import Nav from "../components/nav";
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsfeedGymfeed = () => {
  const navigation = useNavigation();
  const [challenges, setChallenges] = useState([]);
  const [userData, setUserData] = useState(null);  // initialize as null to check for loading state

  const handleSwipeDown = ({ nativeEvent }) => {
    if (nativeEvent.translationY > 50) {
      navigation.navigate('newsfeed');
    }
  };

  // get async storage and then fetch challenges
  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value !== null) {
          const user = JSON.parse(value);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    retrieveUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getGymfeedChallenges();
    }
  }, [userData]);

  const getGymfeedChallenges = async () => {
    let url = `${render}/api/v1/gymfeed`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'comop-api-key': COMOP_API_KEY,
        },
      });
      const data = await response.json();
      const gymId = userData.gymId;
      console.log("userId", userData._id);
      console.log("gymId", gymId);
      
      const completedChallenges = data.data.filter(challenge => 
        !challenge.skipped && challenge.userId.gymId === gymId
      );
      console.log("completed challenges ", completedChallenges);
      setChallenges(completedChallenges);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipeDown}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.greetingContainer}>
          <UserGreeting />
          <Text style={theme.textStyles.customSubtitle}>What happened in your gym today?</Text>
        </View>
        <View style={styles.feedContainer}>
          <Text style={styles.contentGymfeed}>Tap or swipe down to close</Text>
          <TouchableOpacity 
            style={styles.navigationRect} 
            onPress={() => navigation.navigate('newsfeed')}
          />
           <View style={styles.gymfeedContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
                {challenges.map((challenge, index) => (
                  <ChallengeCard
                    key={index}
                    challenge={challenge}
                    userData={userData}
                    isCurrentUserChallenge={challenge.userId._id === userData._id}
                  />
                ))}
              
            </ScrollView>
          </View>
        </View>
        <Nav />
      </View>
    </PanGestureHandler>
  );
};

const ChallengeCard = ({ challenge, userData, isCurrentUserChallenge }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCompletedByUser, setIsCompletedByUser] = useState(false);  
  const [isAccepted, setIsAccepted] = useState(null);
  const [isChoiceMade, setIsChoiceMade] = useState(false);

  // useEffect(() => {
  //   if (!challenge.userId || !userData._id) return; // Ensure userId and userData are defined
  //   setIsCompletedByUser(challenge.userId._id === userData._id);
  // }, [challenge, userData]);

  // useEffect(() => {
  //   if(challenge.isAccepted !== undefined) {
  //     setIsAccepted(challenge.isAccepted);
  //     console.log(challenge.isAccepted);
  //   }
  // }, [challenge]);

  useEffect(() => {
    if (challenge.acceptances.includes(userData._id)) {
      setIsAccepted(true);
      setIsChoiceMade(true);
    } else if (challenge.rejections.includes(userData._id)) {
      setIsAccepted(false);
      setIsChoiceMade(true);
    }
  }, [challenge, userData]);


  const handleImagePress = (event) => {
    const { locationX, width } = event.nativeEvent;
    if (locationX > width / 2) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % challenge.uploadedImages.length);
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + challenge.uploadedImages.length) % challenge.uploadedImages.length);
    }
  };

  const handleAccept = async () => {

    let url = `${render}/api/v1/gymfeed/${challenge._id}/accept`;


    try {
      const userId = userData._id;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'comop-api-key': COMOP_API_KEY,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      console.log("ff data laten zien", data); // Handle success or error response
      setIsAccepted(true);
      setIsChoiceMade(true);
    } catch (error) {
      console.error('Error accepting challenge:', error);
    }
  };

  const handleReject = async () => {

    let url = `${render}/api/v1/gymfeed/${challenge._id}/reject`;
    try {
      const userId = userData._id;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'comop-api-key': COMOP_API_KEY,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      console.log(data); // Handle success or error response
      setIsAccepted(false);
      setIsChoiceMade(true);
    } catch (error) {
      console.error('Error rejecting challenge:', error);
    }
  };

  return (
    <View style={[styles.challengeContainer, isCurrentUserChallenge ? styles.alignRight : styles.alignLeft, isCurrentUserChallenge && { borderTopRightRadius: 0, borderTopLeftRadius: 15 }
      , !isCurrentUserChallenge && { borderTopRightRadius: 15, borderTopLeftRadius: 0 }
    ]}>
      {!isCurrentUserChallenge && (
        <View style={styles.profileImgUser}>
          <View>
            <Image
              style={styles.profileImg}
              source={{ uri: challenge.userId.imgUrl }}
            />
          </View>
          <View style={[styles.boxChoice, isAccepted !== null && { width: '100%', height: 50 }]}>
            {!isChoiceMade ? (
              <>
                <TouchableOpacity onPress={handleAccept}>
                  <Image style={styles.acceptIcon} source={require('../assets/icons/acceptIcon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReject}>
                  <Image style={styles.rejectIcon} source={require('../assets/icons/rejectIcon.png')}></Image>
                </TouchableOpacity>
              </>
            ) : (
              isAccepted === true ? (
                <TouchableOpacity onPress={handleAccept}>
                  <Image style={styles.acceptIcon} source={require('../assets/icons/acceptIcon.png')}></Image>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleReject}>
                  <Image style={styles.rejectIcon} source={require('../assets/icons/rejectIcon.png')}></Image>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      )}
      {isCurrentUserChallenge ? (
        <View style={[styles.boxChallenge, styles.completedChallenge]}>
          {/* Render completed challenge template */}
          <View style={[styles.boxAchievement, styles.completedAchievement]}>
            <Image style={styles.imgAchievement} source={require('../assets/icons/achievementIcon.png')}></Image>
            <Text style={styles.textAchievement}>Achievement</Text>
          </View>
          <TouchableOpacity onPress={handleImagePress}>
            <Image style={styles.imgUserProof} source={{ uri: challenge.uploadedImages[currentImageIndex] }}></Image>
          </TouchableOpacity>
          <View style={styles.circlesContainer}>
            {challenge.uploadedImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.circle,
                  { backgroundColor: index === currentImageIndex ? '#6CC2FF' : '#C7E6FC' }
                ]}
              />
            ))}
          </View>
          <View style={styles.boxUserText}>
            <Text style={[styles.textUserChallenge, styles.textUserCompleted]}>
              <Text style={[styles.userNameText, styles.userNameCompleted]}>{challenge.userId.username}</Text> did the challenge <Text style={[styles.userChallengeText, styles.userChallengeCompleted]}>"{challenge.challengeId.title}"</Text>
            </Text>
          </View>
          <View style={styles.boxEmojis}>
            <View style={styles.boxEmoji1}>
              <TouchableOpacity>
                <Image style={styles.firstEmoji} source={require('../assets/icons/firstEmojiBlack.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo1}>
                <Text style={[styles.firstEmojiText, styles.firstEmojiTextCompleted]}>1</Text>
              </View>
            </View>
            <View style={styles.boxEmoji2}>
              <TouchableOpacity>
                <Image style={styles.secondEmoji} source={require('../assets/icons/secondEmojiBlack.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo2}>
                <Text style={[styles.secondEmojiText, styles.secondEmojiTextCompleted]}>2</Text>
              </View>
            </View> 
            <View style={styles.boxEmoji3}>
              <TouchableOpacity>
                <Image style={styles.thirdEmoji} source={require('../assets/icons/thirdEmojiBlack.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo3}>
                <Text style={[styles.thirdEmojiText, styles.thirdEmojiTextCompleted]}>3</Text>
              </View>
            </View>
            <View style={styles.boxEmoji4}>
              <TouchableOpacity>
                <Image style={styles.fourthEmoji} source={require('../assets/icons/fourthEmojiBlack.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo4}>
                <Text style={[styles.fourthEmojiText, styles.fourthEmojiTextCompleted]}>4</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.boxChallenge}>
          {/* Render standard challenge template */}
          <View style={styles.boxAchievement}>
            <Image style={styles.imgAchievement} source={require('../assets/icons/achievementIcon.png')}></Image>
            <Text style={styles.textAchievement}>Achievement</Text>
          </View>
          <TouchableOpacity onPress={handleImagePress}>
            <Image style={styles.imgUserProof} source={{ uri: challenge.uploadedImages[currentImageIndex] }}></Image>
          </TouchableOpacity>
          <View style={styles.circlesContainer}>
            {challenge.uploadedImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.circle,
                  { backgroundColor: index === currentImageIndex ? '#6CC2FF' : '#C7E6FC' }
                ]}
              />
            ))}
          </View>
          <View style={styles.boxUserText}>
            <Text style={styles.textUserChallenge}>
              <Text style={styles.userNameText}>{challenge.userId.username}</Text> did the challenge <Text style={styles.userChallengeText}>"{challenge.challengeId.title}"</Text>
            </Text>
          </View>
          <View style={styles.boxEmojis}>
            <View style={styles.boxEmoji1}>
              <TouchableOpacity>
                <Image style={styles.firstEmoji} source={require('../assets/icons/firstEmoji.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo1}>
                <Text style={styles.firstEmojiText}>1</Text>
              </View>
            </View>
            <View style={styles.boxEmoji2}>
              <TouchableOpacity>
                <Image style={styles.secondEmoji} source={require('../assets/icons/secondEmoji.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo2}>
                <Text style={styles.secondEmojiText}>2</Text>
              </View>
            </View> 
            <View style={styles.boxEmoji3}>
              <TouchableOpacity>
                <Image style={styles.thirdEmoji} source={require('../assets/icons/thirdEmoji.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo3}>
                <Text style={styles.thirdEmojiText}>3</Text>
              </View>
            </View>
            <View style={styles.boxEmoji4}>
              <TouchableOpacity>
                <Image style={styles.fourthEmoji} source={require('../assets/icons/fourthEmoji.png')}></Image>
              </TouchableOpacity>
              <View style={styles.boxEmo4}>
                <Text style={styles.fourthEmojiText}>4</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  greetingContainer: {
    marginTop: 130,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  feedContainer: {
    width: "100%",
    height: "84%",
    backgroundColor: "#343434",
    color: "#F2F2F2",
    borderRadius: 15,
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navigationRect: {
    backgroundColor: "#F2F2F2",
    width: "80%",
    height: 10,
    borderRadius: 50,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentGymfeed: {
    color: "#F2F2F2",
  },
  gymfeedContainer: {
    width: "100%",
    height: "70%",
    display: "flex",
    // justifyContent: "space-between",
    // alignItems: "flex-end",
    padding: 8,
    marginTop: 20,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  boxChoice: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 100,
  },
  acceptIcon: {
    width: 44,
    height: 44,
    marginBottom: 1,
  },
  rejectIcon: {
    width: 44,
    height: 44,
    marginTop: 1,
  },
  profileImgUser: {
    display: "flex",
    flexDirection: "column",
    height: 160,
    justifyContent: "space-between",
    marginRight: 10,
  },
  boxChallenge: {
    width: 240,
    height: 320, // increased height to accommodate circles
    backgroundColor: "#F2F2F2",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    display: "flex",
    alignItems: "center",
    
  },
  challengeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-start",
    // alignContent: "flex-end",
    width: 240,
    marginBottom: 14,
    marginTop: 14,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },

  alignRight: {
    alignSelf: 'flex-end',
    marginLeft: "auto",
  },

  alignLeft: {
    alignSelf: 'flex-start',
    marginRight: "auto",
  },

  boxAchievement: {
    backgroundColor: "#79ECEC",
    width: 140,
    height: 28,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 4,
    paddingRight: 22,
    alignItems: "center",
    borderRadius: 50,
    marginTop: 12,
  },
  imgAchievement: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  textAchievement: {
    color: "#1C1B1B",
    ...theme.textStyles.customTitle,
    fontSize: 14,
  },
  imgUserProof: {
    width: 200,
    height: 130,
    marginTop: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  boxUserText: {
    width: 200,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textUserChallenge: {
    ...theme.textStyles.customText,
    color: "#1C1B1B",
    fontSize: 14,
  },
  userNameText: {
    ...theme.textStyles.customTitle,
    color: "#1C1B1B",
    fontSize: 14,
  },
  userChallengeText: {
    ...theme.textStyles.customText,
    color: "#1C1B1B",
    fontSize: 14,
  },
  boxEmojis: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    marginTop: 16,
    height: 20,
  },
  firstEmoji: {
    width: 21,
    height: 20,
  },
  firstEmojiText: {
    ...theme.textStyles.customText,
    color: "#1C1B1B",
    fontSize: 14,
  },
  boxEmoji1: {
    display: "flex",
    flexDirection: "row",
  },
  boxEmoji2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  secondEmoji: {
    width: 18,
    height: 23,
  },
  secondEmojiText: {
    ...theme.textStyles.customTitle,
    color: "#1C1B1B",
    fontSize: 14,
  },
  boxEmoji3: {
    display: "flex",
    flexDirection: "row",
  },
  thirdEmoji: {
    width: 21,
    height: 27,
  },
  thirdEmojiText: {
    ...theme.textStyles.customTitle,
    color: "#1C1B1B",
    fontSize: 14,
  },
  boxEmoji4: {
    display: "flex",
    flexDirection: "row",
  },

  fourthEmoji: {
    width: 14,
    height: 24,
  },
  fourthEmojiText: {
    ...theme.textStyles.customTitle,
    color: "#1C1B1B",
    fontSize: 14,
  },
  boxEmo1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  boxEmo2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  boxEmo3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  boxEmo4: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },

  completedChallenge: {
    backgroundColor: '#1C1B1B',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
  },

  completedAchievement: {
    backgroundColor: '#f2f2f2',
  },

  textUserCompleted: {
    color: '#f2f2f2',
  },

  userNameCompleted: {
    color: '#f2f2f2',
  },

  userChallengeCompleted: {
    color: '#f2f2f2',
  },

  firstEmojiTextCompleted: {
    color: '#f2f2f2',
  },

  secondEmojiTextCompleted: {
    color: '#f2f2f2',
  },

  thirdEmojiTextCompleted: {
    color: '#f2f2f2',
  },

  fourthEmojiTextCompleted: {
    color: '#f2f2f2',
  },

  // containerFeed: {
  //   display: 'flex',
  //   alignItems: "flex-end",
  //   width: 390,
  // }
});

export default NewsfeedGymfeed;