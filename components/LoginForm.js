import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { IPADRESS, prod, render } from '../config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './button';
import theme from '../theme';

const LoginForm = ({ onSubmit }) => {
  const [identifier, setIdentifier] = useState(''); // Combineert e-mail en gebruikersnaam in één veld
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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
      let url;
      if (prod) {
        url = `${render}/api/v1/users/login`
      }
      else {
        url = `http:/${IPADRESS}:3000/api/v1/users/login`
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifier, password: password }),
      });
      if (response.ok) {
        // Voer een callbackfunctie uit die is doorgegeven aan onSubmit
        const data = await response.json();
        console.log(data.data.user);
        console.log("Login successful");
        _storeData(data.data.user);
        onSubmit();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
        console.log("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default" // Verandert naar default zodat zowel e-mail als username ingevoerd kan worden
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
