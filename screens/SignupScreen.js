import React from 'react';
import { View, Text, Alert, Image } from 'react-native';
import SignupForm from '../components/SignupForm';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import theme from '../theme';
import Logo from '../components/logo';

const LogoImage = require('../assets/images/ComopLogo.png');

const SignupScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const goToLogin = () => {
    // Deze functie wordt uitgevoerd wanneer er op de link wordt geklikt
    navigation.navigate('login');
  };

  const onSubmit = () => {
    // Deze functie wordt uitgevoerd wanneer het formulier wordt ingediend
    console.log('Formulier ingediend');
    navigation.navigate('challenges');
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Signup</Text>
      <SignupForm onSubmit={onSubmit} navigation={navigation} />
      <Text style={styles.text}>Already have an account? <Text style={{color: theme.colors.purple_dark}} onPress={goToLogin}>Login</Text></Text>
    </View>
  );
}

export default SignupScreen;

const styles = {
  title: {
    ...theme.textStyles.customTitle,
    marginTop: 20,
  },
  logo: { 
    width: 140, 
    height: 32,
    position: 'absolute',
    top: 100,
  },

  text: {
    ...theme.textStyles.customText,
    marginTop: 16,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 200,
  },

  btn: {
    ...theme.colors.orange_dark,
  }
};