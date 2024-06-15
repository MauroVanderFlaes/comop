import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import Nav from '../components/nav';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const ProfileSettings = () => {

    const [userData, setUserData] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const user = JSON.parse(value);
                    setUserData(user);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        retrieveUserData();
    }, [userData]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            const userDataAfterLogout = await AsyncStorage.getItem('userData');
            setUserData({}); // Clear userData state immediately

            console.log('User logged out successfully');
            Alert.alert('Logged out', 'You have been logged out successfully.');
            navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Logo />
            <ArrowBack style={styles.arrowBack} />
            <View style={styles.innerContainer}>

                <View style={styles.content}>
                <View style={styles.greeting}>
                                <UserGreeting style={theme.textStyles.NameTitle} />
                                <Text style={theme.textStyles.customSubtitle}>Do you want to change some settings?</Text>
                    </View>
                    <View style={styles.buttons}>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('changePassword')}><Text style={theme.buttonStyles.buttonText}>Change password</Text></TouchableOpacity>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('termsAndConditions')}><Text style={theme.buttonStyles.buttonText}>Terms & Conditions</Text></TouchableOpacity>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('privacyPolicy')}><Text style={theme.buttonStyles.buttonText}>Privacy policy</Text></TouchableOpacity>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('newsletter')}><Text style={theme.buttonStyles.buttonText}>Newsletter</Text></TouchableOpacity>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('about')}><Text style={theme.buttonStyles.buttonText}>About the app</Text></TouchableOpacity>
                            <TouchableOpacity style={theme.buttonStyles.button} onPress={handleLogout}><Text style={theme.buttonStyles.buttonText}>Log out</Text></TouchableOpacity>
                            <View style={styles.bottom}>
                                <Text style={theme.textStyles.customSubtitle}>© Made by comop @2024</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('')}><Text style={styles.delete}>Delete account</Text></TouchableOpacity>
                            </View>
                        </View>
                </View>
            </View>
            </ScrollView>
            <Nav/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },


    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    content: {
        marginTop: 140,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    greeting: {
        marginRight: 60,
        marginBottom: 40,
    },

    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    delete: {
        color: theme.colors.offblack,
        fontSize: 16,
        fontFamily: theme.fonts.medium,
    },

    bottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 40,
        paddingBottom: 120
    },

    arrowBack: {
        top: 80,
        left: 0,
      },
});

export default ProfileSettings;
