import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import Nav from '../components/nav';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';

const ProfileSettings = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ArrowBack />
            <Logo />
            <View style={styles.content}>
               <View style={styles.greeting}>
                            <UserGreeting style={theme.textStyles.NameTitle} />
                            <Text style={theme.textStyles.customSubtitle}>Do you want to change some settings?</Text>
                </View>
                <View style={styles.buttons}>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('')}><Text style={theme.buttonStyles.buttonText}>Change password</Text></TouchableOpacity>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('termsAndConditions')}><Text style={theme.buttonStyles.buttonText}>Terms & Conditions</Text></TouchableOpacity>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('privacyPolicy')}><Text style={theme.buttonStyles.buttonText}>Privacy policy</Text></TouchableOpacity>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('newsletter')}><Text style={theme.buttonStyles.buttonText}>Newsletter</Text></TouchableOpacity>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={() => navigation.navigate('')}><Text style={theme.buttonStyles.buttonText}>About the app</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('')}><Text style={styles.delete}>Delete account</Text></TouchableOpacity>
                    </View>
            </View>
            <Nav/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    content: {
        marginTop: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    greeting: {
        marginRight: 60,
        marginBottom: 60,
    },

    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
    },

    delete: {
        color: theme.colors.offblack,
        fontSize: 16,
        fontFamily: theme.fonts.medium,
    }
});

export default ProfileSettings;
