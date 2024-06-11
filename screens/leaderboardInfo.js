import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";

const LeaderboardInfo = () => {
    return (
        <View style={styles.container}>
            <ArrowBack />
            <Logo />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.rules}>
                        <View style={styles.header}>
                            <Text style={theme.textStyles.customTitle}>Leaderboard</Text>
                            <Text style={styles.subtitle}>How do I compete?</Text>
                        </View>

                        <View style={styles.chapter}>
                            <ScrollView horizontal={true} >
                                <Image source={require('../assets/images/leaderboard.png')} height={150}/>
                                <Image source={require('../assets/images/leagueInfo.png')}/>
                            </ScrollView>
                            <Text style={styles.Text}>The leaderboard system consists of several leagues. As a new member you start in a low league and by participating in challenges you move up the leaderboard. If you are in the top 3 at the end of the month, you are automatically promoted to a higher league. The last 3 players are relegated to a lower league.</Text>
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

    header: {
        marginLeft: 20,
    },

    content: {
        marginTop: 150,
    },


    subtitle: {
        ...theme.textStyles.customSubtitle,
    },


    chapter: {
        marginTop: 20,
    },

    Text: {
        ...theme.textStyles.customText,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

});

export default LeaderboardInfo;
