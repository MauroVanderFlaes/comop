import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "./nav";
import Logo from "./logo";
import theme from "../theme";
import UserGreeting from "./userGreeting";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    const buttonOnPress = () => {
        console.log("Edit button pressed");
    };

    const profileEdit = () => {
        console.log("Edit profile");
    };

    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    setUserData(JSON.parse(value));
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        retrieveUserData();
    }, []);

    return (
        <View style={styles.profileStyle}>
            <Logo />
            <View style={styles.container}>
            <View>
                <UserGreeting style={theme.textStyles.NameTitle} />
                <Text style={theme.textStyles.customSubtitle}>What a progress you’ve made!</Text>
            </View>
                {userData && (
                    <>

                        
                        <View style={styles.containerUpload}>
                            <TouchableOpacity>
                                <Image
                                    source={require("../assets/noProfile.png")}
                                    style={styles.image}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.editButton} onPress={buttonOnPress}>
                                <Image
                                    source={require("../assets/upload.png")}
                                    style={{ width: 30, height: 30, position: "absolute", top: 15, left: -35}}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.boxFirstChallenges}>
                            <View style={styles.box}>
                                <Text style={styles.boxNumber}>Number 1</Text>
                                <Text style={styles.boxTextTitle}>COMPLETED CHALLENGES</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.boxNumber}>Number 2</Text>
                                <Text style={styles.boxTextTitle}>CREDITS</Text>
                            </View>
                        </View>

                        <View style={styles.boxProfileData}>
                            <Text style={styles.textDetails}>Details</Text>
                            <Button title="Edit" onPress={profileEdit} />
                            <View>
                                <Text style={styles.textDetails}>First name {userData.username}</Text>
                                <Text style={styles.textDetails}>Last name {userData.lastname}</Text>
                                <Text style={styles.textDetails}>Age {userData.age}</Text>
                                <Text style={styles.textDetails}>Phone number</Text>
                                <Text style={styles.textDetails}>Email {userData.email}</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
            <Nav />
        </View>
    );
};

const styles = {
    profileStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        alignItems: "center",
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",


    },

    header: {
        marginBottom: 20,
        alignSelf: "flex-start",
        paddingLeft: 20
    },

    containerUpload: {
        flexDirection: "row",
        alignItems: "center",
    },

    image: {
        width: 104,
        height: 104,
        resizeMode: "contain",
        borderColor: "#6CC2FF",
        borderWidth: 3,
        borderRadius: 52,
    },

    editButton: {
        marginLeft: 10,
    },

    boxFirstChallenges: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        marginTop: 20,
        height: 125,
        
    },
    box: {
        backgroundColor: "#1C1B1B",
        borderRadius: 15,
        width: 165,
        height: 107,
    },

    boxTextTitle: {
        color: "#F2F2F2",
        fontSize: 14,
        fontWeight: "light",
        textAlign: "center",
        marginTop: 10,
    },

    boxNumber: {
        color: "#F2F2F2",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },

    boxProfileData: {
        width: "90%",
        backgroundColor: "#1C1B1B",
        color: "#F2F2F2",
        borderRadius: 15,
        marginRight: 20,
        marginLeft: 20,
    },

    textDetails: {
        color: "#F2F2F2",
        fontSize: 14,
        fontWeight: "light",
        textAlign: "left",
        marginTop: 10,
        marginLeft: 20,
    },
};

export default Profile;