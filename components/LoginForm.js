import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { IPADRESS } from '../config';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const handleLogin = async () => {
    try {
      // Fetch request to login
      const response = await fetch(`http://${IPADRESS}:3000/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.ok) {
        // Voer een callbackfunctie uit die is doorgegeven aan onSubmit
        console.log("Login successful");
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
    <View>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
      

};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
