import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Nav from "../components/nav";
import { IPADRESS, prod, render } from '../config';
import Logo from "../components/logo";
import theme from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const Fitpass = () => {
    const [userData, setUserData] = useState(null);
    const [credits, setCredits] = useState(null);
    const [error, setError] = useState(null);
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    console.log('User data retrieved:', user);
                    setUserData(user);
                    console.log('User ID:', user._id);
                    fetchUserCredits(user._id);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        const fetchUserCredits = async (userId) => {
            console.log('Fetching user credits for user ID:', userId);
            try {
                let url;
                if (prod) {
                    url = `${render}/api/v1/users/credits/${userId}`;
                } else {
                    url = `http://${IPADRESS}:3000/api/v1/users/credits/${userId}`;
                }

                const response = await fetch(url);
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
        };

        retrieveUserData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: false });
            }
        }, [])
    );

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
                <ScrollView ref={scrollViewRef}>
                    <View style={styles.containers}>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward9.png")}
                                    style={styles.image8}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line3} />
                        <View style={styles.container2}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward8.png")}
                                    style={styles.image7}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line2} />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward7.png")}
                                    style={styles.image6}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightImageContainer2}>
                            <Image source={require('../assets/images/linesRightImg.png')} style={styles.rightImage} />
                        </View>
                        <View style={styles.line3} />
                        <View style={styles.container2}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward6.png")}
                                    style={styles.image5}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line2} />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward5.png")}
                                    style={styles.image4}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.leftImageContainer1}>
        <Image source={require('../assets/images/linesLeftImg.png')} style={styles.leftImage} />
                        </View>
                        <View style={styles.line3} />
                        <View style={styles.container2}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward4.png")}
                                    style={styles.image4}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line2} />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward3.png")}
                                    style={styles.image3}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line3} />
                        <View style={styles.container2}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward2.png")}
                                    style={styles.image2}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightImageContainer1}>
                            <Image source={require('../assets/images/linesRightImg.png')} style={styles.rightImage} />
                        </View>
                        <View style={styles.line2} />
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.reward} onPress={() => navigation.navigate("fitpassReward")}>
                                <Image
                                    source={require("../assets/icons/placeholderReward1.png")}
                                    style={styles.image}
                                />
                                <View style={styles.circleBig}></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line1} />
                    <View style={styles.start}>
                        <View style={styles.circle}></View>
                        <Text style={styles.Text}>Start</Text>
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
        marginBottom: 60,
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
        width: 80, // Pas de afmetingen naar wens aan
        height: 70, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image2: {
        position: 'absolute',
        width: 30,
        height: 70, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image3: {
        position: 'absolute',
        width: 45,
        height: 75, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image4: {
        position: 'absolute',
        width: 62,
        height: 75, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image5: {
        position: 'absolute',
        width: 62,
        height: 82, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image6: {
        position: 'absolute',
        width: 62,
        height: 86, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image7: {
        position: 'absolute',
        width: 80,
        height: 36, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image8: {
        position: 'absolute',
        width: 80,
        height: 56, // Pas de afmetingen naar wens aan
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
