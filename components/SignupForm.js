import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPADRESS, prod, render } from '../config';
import CustomButton from './button';
import theme from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SignupForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // State for policy checkbox
  const [updatesChecked, setUpdatesChecked] = useState(false); // State for updates checkbox

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

  const handleSignup = async () => {
    // Check if policy checkbox is checked
    if (!isChecked) {
      Alert.alert('Error', 'Please accept the policy and conditions.');
      return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    let url;
    if (prod) {
      url = `${render}/api/v1/users/signup`
    } else {
      url = `http:/${IPADRESS}:3000/api/v1/users/signup`
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username, 
          email: email, 
          password: password, 
          newsletter: updatesChecked // Include the new field
        }),
      });

      console.log(response);

      if (response.ok) {
        // Voer een callbackfunctie uit die is doorgegeven aan onSubmit
        const data = await response.json();
        console.log(data.data.user);
        console.log("Registration successful ");
        _storeData(data.data.user);
        onSubmit();

      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
        console.log("Signup failed:", errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handlePrivacyPolicyPress = () => {
    navigation.navigate('privacyPolicy'); // Zorg ervoor dat de naam hier overeenkomt met de naam in App.js
  };

  const handleTermsAndConditionsPress = () => {
    navigation.navigate('termsAndConditions'); // Zorg ervoor dat de naam hier overeenkomt met de naam in App.js
  };

  const handleNewsletter = () => {
    navigation.navigate('newsletter'); // Zorg ervoor dat de naam hier overeenkomt met de naam in App.js
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry={true}
      />
      {/* Checkbox for policy and conditions */}
      <View style={styles.checkboxContainer}>
        <Pressable
          style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
          onPress={() => setIsChecked(!isChecked)}>
          {isChecked && <Ionicons name="checkmark" size={24} style={styles.check} />}
        </Pressable>
        <Text style={styles.checkboxLabelContainer}>
          I accept the <Text onPress={handleTermsAndConditionsPress} style={styles.link}>terms and conditions</Text> as well as the <Text onPress={handlePrivacyPolicyPress} style={styles.link}>privacy policy</Text>
        </Text>
      </View>
      {/* Checkbox for updates */}
      <View style={styles.checkboxContainer}>
        <Pressable
          style={[styles.checkboxBase, updatesChecked && styles.checkboxChecked]}
          onPress={() => setUpdatesChecked(!updatesChecked)}>
          {updatesChecked && <Ionicons name="checkmark" size={24} style={styles.check} />}
        </Pressable>
        <Text style={styles.checkboxLabelContainer}>
          Yes, I would like to stay informed and receive updates via the <Text onPress={handleNewsletter} style={styles.link}>newsletter</Text>
        </Text>
      </View>
      <CustomButton title="Sign up" onPress={handleSignup} style={styles.button} />
    </View>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  input: {
    ...theme.fieldStyles.input,
    ...theme.textStyles.customCaption,
  },
  container: {
    ...theme.containerStyles.containerCenter,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Voeg deze regel toe om de checkboxen gelijkmatig te verdelen
    marginVertical: 8,
    marginHorizontal: 30, // Margin toegevoegd om de checkboxen van de rand te centreren
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.blue_dark,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.blue_dark,
  },
  checkboxLabelContainer: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },

  check: {
    color: theme.colors.offwhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    
  },

  link: {
    textDecorationLine: 'underline',
    color: theme.colors.blue_dark,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
  },
});
