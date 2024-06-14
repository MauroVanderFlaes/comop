import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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

    return (
        <View style={styles.fitpassStyle}>
            <Logo />
            <View style={styles.boxFitpass}>
                {error ? (
                    <Text style={styles.Text}>Error: {error}</Text>
                ) : (
                    <Text style={styles.Text}>
                        {credits !== null ? `${credits} Credits` : "Loading..."}
                    </Text>
                )}
                <ScrollView>
                    
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
};

export default Fitpass;
