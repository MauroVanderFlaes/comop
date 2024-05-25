import React from 'react';
import { View, Text, Alert, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/logo';
import theme from '../theme';

const LogoImage = require('../assets/images/ComopLogo.png');

const LoginScreen = ({ navigation }) => {

  const goToSignup = () => {
    // Deze functie wordt uitgevoerd wanneer er op de link wordt geklikt
    navigation.navigate('signup');
  };
  


  const onSubmit = () => {
    // Deze functie wordt uitgevoerd wanneer het formulier wordt ingediend
    console.log('Formulier ingediend');
    // navigation.navigate('challenges');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
      <Text style={styles.title}>Login</Text>
      <LoginForm onSubmit={onSubmit}/>
      <Text style={styles.text}>Don't have a account? <Text style={{ color: theme.colors.purple_dark }} onPress={goToSignup}>Signup</Text></Text>
    </View>
  );
}

const styles = {
  text: {
    ...theme.textStyles.customText,
    marginTop: 20,
  },
  title: {
    ...theme.textStyles.customTitle,
  },

}

export default LoginScreen;
