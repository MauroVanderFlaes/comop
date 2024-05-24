import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { IPADRESS } from '../config';
import CustomButton from './button';

const SignupForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      alert('Error: Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://${IPADRESS}:3000/api/v1/users/signup`, {  
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password }),
      });
      console.log(response);

      if (response.ok) {
        // Voer een callbackfunctie uit die is doorgegeven aan onSubmit
        console.log("Registration successful ");
        onSubmit();
        
      } else {
        console.log("ai ai");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style= {styles.container}>
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
      <CustomButton title="Signup" onPress={handleSignup} style={styles.button} />
    </View>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 350,
    margin: 15,
    borderWidth: 2,
    borderRadius: 28,
    paddingLeft: 24,
    borderColor: '#6CC2FF',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
