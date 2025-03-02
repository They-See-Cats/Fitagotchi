import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, ImageBackground 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Icon Library
import supabase from '../utils/supabaseClient';
import { router } from 'expo-router';
import styles from '../styles/loginStyle'; // Import styles from external file 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email and password are required.');
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
  
      if (error) {
        setErrorMessage('Invalid email or password.');
      } else {
        Alert.alert('Success', 'Login successful!');
        router.push('/(auth)/pet'); // Navigate to next screen
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  }; 

  return (
    <ImageBackground
      style={styles.background}
    >
      {/* Home Icon in the Top Right */}
      <TouchableOpacity style={styles.homeIcon} onPress={() => router.push('/')}>
        <Ionicons name="home" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.heading}>Login to Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Text style={styles.toggleText}>
            {passwordVisible ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.linkText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
