import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";

const FitpassMyReward = () => {
    const route = useRoute();
    const { reward } = route.params;

    // Assume we fetch user's credits from some global state or context
    const [userCredits, setUserCredits] = useState(100); // Example: user has 100 credits

    const handleBuyReward = () => {
        console.log("user credits", userCredits)
        console.log("reward credits", reward.credits)
        if (userCredits >= reward.credits) {
            console.log("enough credits");
            // Proceed with the purchase logic here
        } else {
            Alert.alert("Not enough credits", "You do not have enough credits to buy this reward.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ArrowBack style={styles.arrowBack}/>
                <View style={styles.innerContainer}>
                    <Logo />
                    <View>
                        <UserGreeting style={theme.textStyles.NameTitle} />
                        <Text style={theme.textStyles.customSubtitle}>This is a great choice!</Text>
                    </View>
                    <View style={styles.rewards}>
                        <View style={styles.reward}>
                            <Image
                                source={{ uri: reward.imageUrl }}
                                style={styles.image5}
                            />
                            <View style={styles.circleBig}></View>
                        </View>
                        <View>
                            <Text style={styles.Title}>{reward.name}</Text>
                            <Text style={styles.SubTitle}>Credits: {reward.credits}</Text>
                            <View style={styles.goal}>
                                <Text style={styles.goalSubTitle}>Goal</Text>
                                <Text style={styles.goalText}>{reward.goal}</Text>
                            </View>
                            <View style={styles.goal}>
                                <Text style={styles.goalSubTitle}>Benefits</Text>
                                <Text style={styles.goalText}>{reward.benefits}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={theme.buttonStyles.button} onPress={handleBuyReward}>
                            <Text style={theme.buttonStyles.buttonText}>Buy this reward</Text>
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
        left: 20,
    },
    rewards: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        gap: 20,
    },
    reward: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    goal: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10,
        marginTop: 20,
    },
    circleBig: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: theme.colors.blue_dark,
    },
    image5: {
        position: 'absolute',
        width: 90,
        height: 120,
        zIndex: 1,
    },
    Title: {
        ...theme.textStyles.customTitle,
        fontSize: 22,
        textAlign: "center",
        color: theme.colors.offblack,
    },
    SubTitle: {
        ...theme.textStyles.customSubtitle,
        fontSize: 18,
        textAlign: "center",
        color: theme.colors.offblack,
    },
    goalSubTitle: {
        paddingLeft: 20,
        fontWeight: "bold",
        ...theme.textStyles.customSubtitle,
        fontSize: 18,
        color: theme.colors.offblack,
    },
    goalText: {
        paddingLeft: 20,
        paddingRight: 20,
        ...theme.textStyles.customText,
        fontSize: 16,
        textAlign: "left",
        color: theme.colors.offblack,
    },
});

export default FitpassMyReward;
