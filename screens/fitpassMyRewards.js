import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { useNavigation } from '@react-navigation/native';

const FitpassMyRewards = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                <View style={styles.innerContainer}>
                    <Logo />
                    <View>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>Here are your deserved rewards</Text>
                    </View>
                    <View style={styles.rewards}>
                        <TouchableOpacity style={styles.rewardBox} onPress={() => navigation.navigate("fitpassMyReward")}>
                            <View style={styles.rewardBoxContent}>
                            <View style={styles.reward}>
                                <Image
                                    source={require("../assets/icons/placeholderReward6.png")}
                                    style={styles.image5}
                                />
                                <View style={styles.circleBig}></View>
                            </View>
                            <View>
                                <Text style={styles.Title}>REWARDNAAM</Text>
                                <Text style={styles.Text}>Click to view reward</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: "center",
    },
    scrollContainer: {
        paddingBottom: 100,
        alignItems: "center",
    },
    innerContainer: {
        paddingTop: 130,
        alignItems: "center",
    },
    arrowBack: {
        top: 80,
        left: 7,
    },

    rewards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20,
    },

    rewardBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.offblack,
        width: 350,
        height: 180,
        borderRadius: 15,
    },

    rewardBoxContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginHorizontal: 20,
    },

    reward: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    circleBig: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.blue_dark,
    },

    image5: {
        position: 'absolute',
        width: 62,
        height: 82, // Pas de afmetingen naar wens aan
        zIndex: 1, // Zorgt ervoor dat de Image bovenop de View wordt getoond
    },

    Title: {
        ...theme.textStyles.customTitle,
        fontSize: 22,
        textAlign: "center",
        color: "#F2F2F2",
    },

    Text: {
        ...theme.textStyles.customText,
        fontSize: 16,
        textAlign: "center",
        color: "#F2F2F2",
    },
});


export default FitpassMyRewards;
