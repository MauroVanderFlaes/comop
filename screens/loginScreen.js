import React from 'react';
import { View, Text, Alert } from 'react-native';
import LoginForm from '../components/LoginForm';

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
      <Text>Login</Text>
      <LoginForm onSubmit={onSubmit}/>
      <Text>Don't have a account? <Text style={{ color: 'blue' }} onPress={goToSignup}>Signup</Text></Text>
    </View>
  );
}

export default LoginScreen;
