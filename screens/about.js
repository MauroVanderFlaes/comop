import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
  return (
      <View style={styles.container}>
        <ArrowBack />
        <Logo />
        <View style={styles.content}>
        <ScrollView>
            <View style={styles.rules}>
                <View style={styles.header}>
                <Text style={theme.textStyles.customTitle}>About the app</Text>
                <Text style={styles.subtitle}>Get to know Comop!</Text>
                </View>
                <Text style={styles.texts}>"Comop" is more than just a fitness app; it is a community of dedicated fitness enthusiasts who inspire and motivate each other to achieve their fitness goals. Our app is designed to harness the power of collaboration through fun challenges, rewards and building a strong community within specific fitness centres.</Text>
                <Text style={theme.textStyles.customTitle}>App highlights</Text>
                <Text style={theme.textStyles.customText}>Challenges and Rewards</Text>
                <Text style={styles.texts}>Take part in engaging challenges, such as spotting a fellow fitness professional doing bench presses, and earn credits to compete for exclusive rewards ranging from shake cups to protein bars.</Text>
                <Text style={theme.textStyles.customText}>Community Feed</Text>
                <Text style={styles.texts}>Keep up to date with what's happening in your fitness community. Share your achievements, completed challenges and get positive feedback from fellow fitness enthusiasts.</Text>
                <Text style={theme.textStyles.customText}>Free Use</Text>
                <Text style={styles.texts}>Use the app completely free of charge and enjoy the benefits of an active and supportive fitness community.</Text>
                <Text style={theme.textStyles.customText}>Fitpass</Text>
                <Text style={styles.texts}>Claim your earned rewards in our fitpass and make your fitness experience even more satisfying with high-quality products.</Text>
                
                <Text style={styles.texts}>"Comop" takes fitness to the next level by integrating the power of social interaction into your fitness journey. Join our growing community, reach new heights and motivate others along the way. Download "Comop" today and discover a new dimension of fitness. Fit together, thrive together!</Text>
                <Text style={styles.texts}>For questions or comments, contact us at [contact@comop.be].</Text>
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

    subtitle: {
        ...theme.textStyles.customSubtitle,
    },  

    header: {
        marginBottom: 20,
    },
    
    texts: {
        ...theme.textStyles.customDetail,
        marginBottom: 20,
    },

    rules: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 60,
    },
});

export default About;
