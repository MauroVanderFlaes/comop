import React from 'react';
import { View, Text, Alert } from 'react-native';
import SignupForm from '../components/SignupForm';

const SignupScreen = ({ navigation }) => {

  const onSubmit = () => {
    // Deze functie wordt uitgevoerd wanneer het formulier wordt ingediend
    console.log('Formulier ingediend');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup</Text>
      <SignupForm onSubmit={onSubmit}/>
    </View>
  );
}

export default SignupScreen;
