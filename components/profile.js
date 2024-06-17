import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Pressable, ScrollView } from "react-native";
import { IPADRESS, prod, render, COMOP_API_KEY } from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Nav from "./nav";
import Logo from "./logo";
import theme from "../theme";
import UserGreeting from "./userGreeting";
import * as ImagePicker from 'expo-image-picker';
import { CLOUDINARY_URL, CLOUDINARY_PRESET, CLOUDINARY_CLOUD_NAME } from '../config';


const Profile = () => {

    const url = CLOUDINARY_URL;
    const preset = CLOUDINARY_PRESET;
    const cloudName = CLOUDINARY_CLOUD_NAME;

    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [credits, setCredits] = useState(null);
    const [completedChallenges, setCompletedChallenges] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    console.log('User data:', userData);
    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    setUserData(user);
                    fetchUserCredits(user._id);
                    fetchCompletedChallenges(user._id);
                }
            } catch (error) {
                Alert.alert(`Error retrieving user data: ${error.message}`);
            }
        };

        const fetchUserCredits = async (userId) => {
            try {
                let url = `${render}/api/v1/users/credits/${userId}`;
                const response = await fetch(url, { headers:{'comop-api-key': COMOP_API_KEY,} });
                const result = await response.json();
                if (response.ok) {
                    setCredits(result.data.credits);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Error fetching user credits');
            }
        };

        const fetchCompletedChallenges = async (userId) => {
            try {
                let url = `${render}/api/v1/gymfeed/${userId}`;
                const response = await fetch(url, { headers:{'comop-api-key': COMOP_API_KEY,} });
                const result = await response.json();
                if (response.ok) {
                    setCompletedChallenges(result.data.length);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Error fetching completed challenges');
            }
        };

        retrieveUserData();
    }, []);

    useEffect(() => {
        if (userData && !image) {
            fetchProfileImage(userData._id);
        }
    }, [userData, image]);

    const fetchProfileImage = async (userId) => {
        try {
            let url = `${render}/api/v1/users/profileImg/${userId}`;
            const response = await fetch(url, { headers:{'comop-api-key': COMOP_API_KEY,} });
            if (!response.ok) {
                throw new Error(`Failed to fetch profile image: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.data && data.data.imgUrl) {
                setImage(data.data.imgUrl);
            } else {
                setImage(null);
            }
        } catch (error) {
            Alert.alert(`Error fetching profile image: ${error.message}`);
            setImage(null);
        }
    };

    const buttonOnPress = () => {
        console.log("Edit button pressed");
    };


    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const uploadedUrl = await uploadImage(result.assets[0].uri);
                if (uploadedUrl) {
                    setImage(result.assets[0].uri);
                    await storeImage(uploadedUrl);
                } else {
                    const error = new Error("Failed to upload image");
                    Alert.alert(`Error uploading image: ${error.message}`);
                }
            }
        } catch (error) {
            Alert.alert(`Error selecting image: ${error.message}`);
        }
    };

    const uploadImage = async (imageUri) => {
        let formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg",
            name: "upload.jpg",
        });
        formData.append("upload_preset", CLOUDINARY_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", headers: {'comop-api-key': COMOP_API_KEY,}, body: formData });
            const imgData = await response.json();
            if (response.ok) {
                return imgData.secure_url;
            } else {
                throw new Error(`Failed to upload image: ${imgData.error.message}`);
            }
        } catch (error) {
            Alert.alert(`Error uploading image: ${error.message}`);
            return null;
        }
    };

    const storeImage = async (imgUrl) => {
        try {
            const userId = userData._id;
            let url = `${render}/api/v1/users/profileImg/${userId}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", 'comop-api-key': COMOP_API_KEY, },
                body: JSON.stringify({ imgUrl }),
            });
            if (response.ok) {
                const updateUserData = { ...userData, imgUrl };
                setUserData(updateUserData);
            } else {
                console.error("Failed to store image URL");
            }
        } catch (error) {
            Alert.alert(`Error storing image URL: ${error.message}`);
        }
    };

    return (
        <View style={styles.profileStyle}>
            <ScrollView
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.con}>
                    <Logo />
                    <View style={styles.container}>
                        <View style={styles.greeting}>
                            <UserGreeting style={theme.textStyles.NameTitle} />
                            <Text style={theme.textStyles.customSubtitle}>What a progress you’ve made!</Text>
                        </View>
                        <View style={styles.contain}>
                        {userData && (
                    <>
                        <View style={styles.containerUpload}>
                        <TouchableOpacity onPress={selectImage}>
                            <Image
                                source={image ? { uri: image } : require("../assets/noProfile.png")}
                                style={styles.image}
                            />
                        </TouchableOpacity>

                            <TouchableOpacity style={styles.editButton} onPress={buttonOnPress}>
                                <Image
                                    source={require("../assets/upload.png")}
                                    style={{ width: 30, height: 30, position: "absolute", top: 25, left: -40 }}
                                />

                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.boxFirstChallenges}>
                                        <View style={styles.box}>
                                            <Text style={styles.boxNumber}>{completedChallenges !== null ? `${completedChallenges}` : "Loading..."}</Text>
                                            <Text style={styles.boxTextTitle}>COMPLETED CHALLENGES</Text>
                                        </View>
                                        <View style={styles.box}>
                                            <Text style={styles.boxNumber}>{credits !== null ? `${credits}` : "Loading..."}</Text>
                                            <Text style={styles.boxTextTitle}>CREDITS</Text>
                                        </View>
                                    </View>

                                    <View style={styles.boxProfileData}>
                                        <Text style={styles.Title}>Details</Text>
                                        <View>
                                            <Text style={styles.titleDetails}>Username</Text>
                                            <Text style={styles.textDetails}>{userData.username}</Text>
                                            <Text style={styles.titleDetails}>Name</Text>
                                            <Text style={styles.titleDetails}>{userData.name}</Text>
                                            <Text style={styles.titleDetails}>Age</Text>
                                            <Text style={styles.textDetails}>{userData.age}</Text>
                                            <Text style={styles.titleDetails}>Email</Text>
                                            <Text style={styles.textDetails}>{userData.email}</Text>
                                        </View>
                                        <Pressable style={styles.editDetails}><Text>Edit details</Text></Pressable>
                                    </View>
                                    <View>
                                        <View style={styles.boxCharacter}>
                                            <Text style={styles.Title}>Character</Text>
                                            <View style={styles.Characters}>
                                                <View style={styles.Character}>
                                                    <Text style={styles.boxTitle}>Cheat meal</Text>
                                                </View>
                                                <View style={styles.Character}>
                                                    <Text style={styles.boxTitle}>Fitness goal</Text>
                                                </View>
                                                <View style={styles.Character}>
                                                    <Text style={styles.boxTitle}>Character</Text>
                                                </View>
                                                <View style={styles.Character}>
                                                    <Text style={styles.boxTitle}>Favorite day</Text>
                                                </View>
                                                <View style={styles.Character}>
                                                    <Text style={styles.boxTitle}>Favorite exercise</Text>
                                                </View>
                                            </View>
                                            <Pressable onPress={''} style={styles.editDetails}><Text>Edit character</Text></Pressable>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('profileSettings')}><Text style={theme.buttonStyles.buttonText}>Settings</Text></TouchableOpacity>
                                    <View style={styles.boxSpacing}></View>

                                </>
                            )}
                        </View>
                    </View>

                </View>
            </ScrollView>
            <Nav />
        </View>
    );
};

const styles = {
    profileStyle: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    con: {
        flex: 1,
        alignItems: "center",
    },

    greeting: {
        marginLeft: 20,
        marginBottom: 20,
    },

    container: {
        display: "flex",
        width: "100%",
        // gap: 20,
        marginTop: 130,
        height: "100%",

    },

    contain: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 20,
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
        resizeMode: "cover",
        borderColor: "#6CC2FF",
        borderWidth: 3,
        borderRadius: 52,
    },

    editButton: {
        marginLeft: 10,
    },

    center: {
        alignItems: 'center',
        marginTop: 20,
    },

    boxFirstChallenges: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        marginTop: 20,
        height: 125,
        
    },

    box: {
        backgroundColor: theme.colors.green_dark,
        borderRadius: 15,
        width: 160,
        height: 107,
    },

    boxTextTitle: {
        color: theme.colors.offblack,
        fontSize: 14,
        fontWeight: "light",
        textAlign: "center",
        marginTop: 10,
    },

    boxNumber: {
        color: theme.colors.offblack,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },

    boxTitle: {
        color: theme.colors.offblack,
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
        paddingBottom: 24,
    },

    textDetails: {
        color: "#F2F2F2",
        fontSize: 14,
        fontWeight: "light",
        textAlign: "left",
        marginTop: 10,
        marginLeft: 20,
    },

    Title: {
        //use titleDetails here
        color: "#F2F2F2",
        ...theme.textStyles.customTitle,
        fontSize: 20,
        textAlign: "center",
        marginTop: 24,
    },

    titleDetails: {
        color: "#F2F2F2",
        ...theme.textStyles.customTitle,
        fontSize: 18,
        textAlign: "left",
        marginTop: 10,
        marginLeft: 20,
    },

    editDetails: {
        backgroundColor: theme.colors.offwhite,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginHorizontal: 24,
        marginTop: 20,
    },

    boxCharacter: {
        marginTop: 20,
        marginBottom: 24,
        width: "90%",
        backgroundColor: "#1C1B1B",
        borderRadius: 15,
        marginRight: 20,
        marginLeft: 20,
        paddingBottom: 24,
    },

    Characters: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
        gap: 8,
    },

    Character: {
        backgroundColor: theme.colors.orange_dark,
        borderRadius: 15,
        maxWidth: 200,
        paddingHorizontal: 16,
        height: 107,
    },

    boxSpacing: {
        height: 120,
    },
};

export default Profile;
