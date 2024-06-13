import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Button, ActivityIndicator, Alert, Pressable , ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "./nav";
import Logo from "./logo";
import theme from "../theme";
import UserGreeting from "./userGreeting";
import axios from "axios";
import { CLOUDINARY_URL, CLOUDINARY_PRESET, CLOUDINARY_CLOUD_NAME } from '../config';
import * as ImagePicker from 'expo-image-picker';
import { IPADRESS } from '../config';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    console.log("Image state:", image);
    // console.log("userDAta url:", userData.imgUrl); 

    const url = CLOUDINARY_URL;
    const preset = CLOUDINARY_PRESET;
    const cloudName = CLOUDINARY_CLOUD_NAME;


    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    setUserData(JSON.parse(value));
                }
            } catch (error) {
                // console.error('Error retrieving user data:', error);
                Alert.alert(`Error retrieving user data: ${error.message}`);
            }
            
        };

        retrieveUserData();
    }, []);

    useEffect(() => {
        if (userData && !image) {
            console.log("fetching profile image...");
            fetchProfileImage(userData._id);
        }
    }, [userData, image]);

    const fetchProfileImage = async (userId) => {
        // Fetch profile image from database using user ID
        try {
            const response = await fetch(`http://${IPADRESS}:3000/api/v1/users/profileImg/${userId}`);
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error(`Failed to fetch profile image: ${response.statusText}`);
            }
            
            // Parse response as JSON
            const data = await response.json();
            console.log("Profile image data:", data);
            
            // Check if data contains image URL
            if (data && data.data && data.data.imgUrl) {
                setImage(data.data.imgUrl);
            } else {
                // console.log("No profile image found, using default image");
                setImage(null); // Explicitly set to null to use default image
            }
        } catch (error) {
            // console.error('Error fetching profile image:', error);
            Alert.alert(`Error fetching profile image: ${error.message}`);
            setImage(null); 
        }
    };

    
    const buttonOnPress = () => {
        console.log("Edit button pressed");
    };

    const profileEdit = () => {
        console.log("Edit profile");
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const uploadedUrl = await uploadImage(result.assets[0].uri);
                if (uploadedUrl) {
                    console.log("Image uploaded successfully:", uploadedUrl);
                    setImage(result.assets[0].uri);
                    await storeImage(uploadedUrl);
                } 
                else {
                    const error = new Error("Failed to upload image");
                    Alert.alert(`Error uploading image: ${error.message}`);
                    // Alert.alert(`Error uploading image: ${error.message}`);
                    // Handle error, e.g., show an error message to the user
                }
            }
        } catch (error) {
            // console.error('Error selecting image:', error);
            Alert.alert(`Error selecting image: ${error.message}`);
            // Handle error, e.g., show an error message to the user
        }
    };
    
    
    const uploadImage = async (imageUri) => {
        let formData = new FormData();
    
        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg", // Adjust the type as needed based on the selected image type
            name: "upload.jpg", // Adjust the name if needed
        });
        formData.append("upload_preset", preset);
    
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
    
            const imgData = await response.json();
            console.log("Image data:", imgData);

            if(response.ok){
                return imgData.secure_url;
            }
            else{
                // Alert.alert(`Failed to upload image: ${imgData.message}`);
                throw new Error(`Failed to upload image: ${imgData.error.message}`);
            }
        } catch (error) {
            // console.error("Error uploading image:", error);
            Alert.alert(`Error uploading image: ${error.message}`);
            return null;
        }
    };
    
    const storeImage = async (imgUrl) => {
        try {
            const userId = userData._id; // assuming userData contains the user's ID
            console.log("User ID:", userId);
            const response = await fetch(
                `http://${IPADRESS}:3000/api/v1/users/profileImg/${userId}`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ imgUrl }),
                }
            );
            
            if (response.ok) {
                const updateUserData = { ...userData, imgUrl };
                setUserData(updateUserData);
                console.log("updated user data:", updateUserData);
                console.log("Image URL stored successfully");
            } else {
                console.error("Failed to store image URL");
            }
        } catch (error) {
            // console.error('Error storing image URL:', error);
            Alert.alert(`Error storing image URL: ${error.message}`);
        }
    };
    
    
    

    return (
        <View style={styles.profileStyle}>
            <Logo />
            <ScrollView style={styles.container}>
                <View>
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
                                    style={{ width: 30, height: 30, position: "absolute", top: 15, left: -35 }}
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
                            <Text style={styles.Title}>Details</Text>
                            <View>
                                <Text style={styles.titleDetails}>Username</Text>
                                <Text style={styles.textDetails}>{userData.username}</Text>
                                <Text style={styles.titleDetails}>Age {userData.age}</Text>
                                <Text style={styles.titleDetails}>Phone number</Text>
                                <Text style={styles.titleDetails}>Email</Text>
                                <Text style={styles.textDetails}>{userData.email}</Text>
                            </View>
                            <Pressable onPress={''} style={styles.editDetails}><Text>Edit details</Text></Pressable>
                        </View>
                    </>
                    )}
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
    },

    container: {
        display: "flex",
        width: "100%",
        gap: 20,
        marginTop: 150,
        height: "20%",
    },

    contain: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
};

export default Profile;
