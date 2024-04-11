import React from 'react';
import { View, Text, Alert } from 'react-native';
import SignupForm from '../components/SignupForm';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const SignupScreen = ({ navigation }) => {

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup</Text>
      <SignupForm onSubmit={onSubmit}/>
      <Text>Already have an account? <Text style={{ color: 'blue' }} onPress={goToLogin}>Login</Text></Text>
    </View>
  );
}

export default SignupScreen;
