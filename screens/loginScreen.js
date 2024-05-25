import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/logo';
import theme from '../theme';

const LoginScreen = ({ navigation }) => {

  const goToSignup = () => {
    // Deze functie wordt uitgevoerd wanneer er op de link wordt geklikt
    navigation.navigate('signup');
  };

  const onSubmit = () => {
    // Deze functie wordt uitgevoerd wanneer het formulier wordt ingediend
    console.log('Formulier ingediend');
    // Navigeren naar een ander scherm na succesvol inloggen
    navigation.navigate('challenges');
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Login</Text>
      <LoginForm onSubmit={onSubmit} />
      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={goToSignup}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    ...theme.textStyles.customTitle,
    marginBottom: 20,
  },
  text: {
    ...theme.textStyles.customText,
    marginTop: 20,
  },
  signupLink: {
    color: theme.colors.purple_dark,
  },
});

export default LoginScreen;
