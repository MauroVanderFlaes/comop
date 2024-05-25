import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { IPADRESS } from '../config';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './button';
import theme from '../theme';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // [1
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const _storeData = async (userData) => {
    try {
      await AsyncStorage.setItem(
        'userData', // Key
        JSON.stringify(userData) // Store user data received from server response
      );
      console.log('Login data saved successfully');
      navigation.navigate('challenges');
    } catch (error) {
      console.error('Error saving login data:', error);
      Alert.alert('Error', 'Failed to save login data. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      // Fetch request to login
      const response = await fetch(`http://${IPADRESS}:3000/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password}),
      });
      if (response.ok) {
        // Voer een callbackfunctie uit die is doorgegeven aan onSubmit
        const data = await response.json();
        console.log(data.data.user);
        console.log("Login successful");
        _storeData(data.data.user);
        onSubmit();
        
      } else {
        console.log("ai ai");
      }
    } 
    
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <CustomButton title="Login" onPress={handleLogin} style={styles.button} />
    </View>
  );
      

};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    ...theme.fieldStyles.input,
  },
  container: {
    ...theme.containerStyles.containerCenter,
  },

});
