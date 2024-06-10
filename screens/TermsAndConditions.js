import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from "../components/logo";
import UserGreeting from '../components/userGreeting';
import ArrowBack from '../components/arrowBack';
import theme from "../theme";
import { ScrollView } from 'react-native-gesture-handler';

const TermsAndConditions = () => {
  return (
      <View style={styles.container}>
        <ArrowBack />
        <Logo />
        <View style={styles.content}>
        <ScrollView>
            <View style={styles.rules}>
                <View style={styles.header}>
                <Text style={theme.textStyles.customTitle}>Terms and Conditions</Text>
                <Text style={styles.subtitle}>Some info about comop’s terms and conditions</Text>
                </View>
                <Text style={theme.textStyles.customText}>Acceptance of the Terms:</Text>
                <Text style={styles.texts}>Users must agree to the terms and conditions before utilizing the "Comop" fitness app.</Text>
                <Text style={theme.textStyles.customText}>User Conduct:</Text>
                <Text style={styles.texts}>Users are expected to behave in a respectful manner when participating in challenges and contributing to the fitness community within the app.</Text>
                <Text style={theme.textStyles.customText}>Privacy Policy:</Text>
                <Text style={styles.texts}>The app contains a link to the privacy policy explaining how user data is collected, stored, and utilized, with special attention to user privacy within the fitness community.</Text>
                <Text style={theme.textStyles.customText}>Intellectual Property:</Text>
                <Text style={styles.texts}>The terms include provisions regarding the app's intellectual property, including copyrights on content and trademarks.</Text>
                <Text style={theme.textStyles.customText}>Termination of Service:</Text>
                <Text style={styles.texts}>The terms specify under what circumstances the app provider has the right to terminate a user's access to the service.</Text>
                <Text style={theme.textStyles.customText}>Liability Disclaimer:</Text>
                <Text style={styles.texts}>The app provider limits liability for certain types of damages users may experience while using the app.</Text>
                <Text style={theme.textStyles.customText}>Updates and Changes:</Text>
                <Text style={styles.texts}>Information on how the app provider can update the terms and how users will be notified of such changes.</Text>
                <Text style={theme.textStyles.customText}>Applicable Law:</Text>
                <Text style={styles.texts}>The terms specify the jurisdiction applicable to the agreement between the user and the app provider.</Text>
                <Text style={theme.textStyles.customText}>Dispute Resolution:</Text>
                <Text style={styles.texts}>Procedures for resolving disputes between users and the app provider, including the option for arbitration and waiving collective legal actions.</Text>
                <Text style={theme.textStyles.customText}>Contact Information:</Text>
                <Text style={styles.texts}>For questions or comments regarding this privacy policy, contact us at [contact@comop.be].
                By using the "Comop" app, you consent to the terms of this privacy policy.</Text>
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

export default TermsAndConditions;
