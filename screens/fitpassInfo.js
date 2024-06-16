import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Logo from "../components/logo";
import Nav from "../components/nav";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";

const FitpassInfo = () => {
    return (
        <View style={styles.container}>
            <ArrowBack style={styles.arrowBack} />
            <Logo />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.rules}>
                        <View style={styles.header}>
                            <Text style={theme.textStyles.customTitle}>Fitpass</Text>
                            <Text style={styles.subtitle}>How do I earn my rewards?</Text>
                        </View>

                        <View style={styles.chapter}>
                                <Image source={require('../assets/images/fitpassInfo.png')} style={styles.image}/>
                            <Text style={styles.Text}>By participating in challenges, you earn credits. the more credits you have, the higher you rise in the Fitpass path. With these credits you can buy rewards on the Fitpass. The higher in the Fitpass path, the better and bigger rewards you can get. Once you purchase a reward, you will receive a QR code that you can use to redeem it with the fitness crew.  You now start back on the path at the level of your credits.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Nav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    image: {
        height: 360,
        width: 420,
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
        paddingBottom: 120,
    },

    arrowBack: {
        top: 80,
        left: 20,
    }

});

export default FitpassInfo;
