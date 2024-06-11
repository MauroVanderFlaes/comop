import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";

const Newsletter = () => {
    return (
        <View style={styles.container}>
            <ArrowBack />
            <Logo />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.rules}>
                        <View style={styles.header}>
                            <Text style={theme.textStyles.customTitle}>Newsletter</Text>
                            <Text style={styles.subtitle}>Stay in the Loop with the "Comop" Fitness Community!</Text>
                        </View>
                        <Text style={theme.textStyles.customDetail}>Our newsletter is your ultimate source for the latest news, updates, and exclusive offers from our fitness community. Regularly receive information on:</Text>

                        <View style={styles.chapter}>
                            <Text style={theme.textStyles.customText}>1. Events and Challenges</Text>
                            <Text style={styles.texts}>Never miss an exciting event or a new challenge again. Be the first to know about upcoming activities and participation requirements.</Text>
                            <Text style={theme.textStyles.customText}>2. New Features and Updates</Text>
                            <Text style={styles.texts}>Learn about new features and improvements on our platform, so you're always up to date with the latest capabilities.</Text>
                            <Text style={theme.textStyles.customText}>3. Expert Advice and Tips</Text>
                            <Text style={styles.texts}>Receive valuable advice and helpful tips from fitness experts to help you reach your goals and maintain a healthy lifestyle.</Text>
                            <Text style={theme.textStyles.customText}>4. Exclusive Offers</Text>
                            <Text style={styles.texts}>Take advantage of special offers and discounts exclusively available to newsletter subscribers. Save on your favorite products and services and get more out of your fitness journey.</Text>
                            <Text style={theme.textStyles.customText}>Contact:</Text>
                            <Text style={styles.texts}>For questions or comments regarding the newsletter, contact us at [contact@comop.be].</Text>
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

export default Newsletter;
