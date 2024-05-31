import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../theme";

const UserGreeting = () => {
    const [userData, setUserData] = useState(null);

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
        <Text style={theme.textStyles.NameTitle}>
            {userData ? `Hello ${userData.username},` : 'Loading...'}
        </Text>
    );
};

export default UserGreeting;
