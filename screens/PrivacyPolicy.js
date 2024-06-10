import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <ArrowBack />
            <Logo />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.rules}>
                        <View style={styles.header}>
                            <Text style={theme.textStyles.customTitle}>Privacy policy</Text>
                            <Text style={styles.subtitle}>Some info about comop’s privacy policy</Text>
                        </View>
                        <Text style={theme.textStyles.customDetail}>Last Updated on 02/01/2024

                            This privacy policy describes how Comop ("we," "us," "our") collects, uses, and shares personal information when you use our "Comop" fitness app.

                            Please carefully read this privacy policy to understand how we process your personal information.</Text>

                        <View style={styles.chapter}>
                            <Text style={theme.textStyles.customText}>1. Information We Collect:</Text>
                            <Text style={styles.texts}>1.1 Account Information: When registering for the app, we collect information such as your name, email address, and username.</Text>
                            <Text style={styles.texts}>1.2 Usage Data: We collect information about how you use the app, including the challenges you participate in and the rewards you claim.</Text>
                            <Text style={styles.texts}>1.3 Location Data: With your permission, we may access location data to enable certain app features, such as finding fitness enthusiasts nearby.</Text>
                            <Text style={theme.textStyles.customText}>2. How We Use Information:</Text>
                            <Text style={styles.texts}>2.1 App Functionality: We use the collected information to provide app functionality, including displaying challenges, building the community, and providing rewards.</Text>
                            <Text style={styles.texts}>2.2 Communication: We may notify you of important updates, new challenges, or rewards through email or in-app notifications.</Text>
                            <Text style={styles.texts}>2.3 Community Interactions: User interactions shared in the app feed, such as completing challenges, are used to enhance the community experience.</Text>
                            <Text style={styles.texts}>The app contains a link to the privacy policy explaining how user data is collected, stored, and utilized, with special attention to user privacy within the fitness community.</Text>
                            <Text style={theme.textStyles.customText}>3. Sharing of Information:</Text>
                            <Text style={styles.texts}>3.1 With Fitness Leaders: We share aggregated user statistics with fitness leaders to provide insights into app usage within their fitness community.</Text>
                            <Text style={styles.texts}>3.2 With Third Parties: We do not share personal information with third parties without your explicit consent, unless required by law.</Text>
                            <Text style={theme.textStyles.customText}>4. Your Choices:</Text>
                            <Text style={styles.texts}>4.1 Access and Editing: You have the right to access and update your personal information.</Text>
                            <Text style={styles.texts}>4.2 Location Data: You can revoke permission for sharing location data at any time through your mobile device settings.</Text>
                            <Text style={theme.textStyles.customText}>5. Security:</Text>
                            <Text style={styles.texts}>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</Text>
                            <Text style={theme.textStyles.customText}>6. Changes to this Privacy Policy:</Text>
                            <Text style={styles.texts}>We reserve the right to update this privacy policy at any time. The date of the last modification is displayed at the top of the policy.</Text>
                            <Text style={theme.textStyles.customText}>7. Contact:</Text>
                            <Text style={styles.texts}>For questions or comments regarding this privacy policy, contact us at [contact@comop.be].
                            By using the "Comop" app, you consent to the terms of this privacy policy.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
    },

    texts: {
        ...theme.textStyles.customDetail,
        marginBottom: 20,
    },

    subtitle: {
        ...theme.textStyles.customSubtitle,
    },

    header: {
        marginBottom: 20,
    },

    chapter: {
        marginTop: 60,
    },

    rules: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 60,
    },
});

export default PrivacyPolicy;
