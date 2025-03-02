import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, View, TextInput, TouchableOpacity, Alert, ImageBackground 
} from 'react-native';
import supabase from '../utils/supabaseClient';
import styles from '../styles/registrationStyle';  // Import the styles
import { router } from 'expo-router';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function that handles the registration process
  const handleRegister = async () => {
    setErrorMessage('');

    // ✅ Input Validations
    if (!firstName.trim()) {
      setErrorMessage('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }
    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // ✅ Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          data: { firstName, lastName }, // Stores metadata in Supabase Auth
        },
      });

      if (error) {
        console.error('Error signing up:', error);
        setErrorMessage(error.message);
        return;
      }

      const userId = data.user?.id;
      console.log('User created:', userId);

      // ✅ Insert additional user data into "Users" table
      if (userId) {
        const { error: userError } = await supabase.from('Users').insert([
          {
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
          },
        ]);

        if (userError) {
          console.error('Error inserting user data:', userError);
          Alert.alert('Registration Successful', 'But failed to save additional info.');
        }
      }

      // ✅ Success Message
      Alert.alert('Success', 'Check your email for the verification link!');

      // ✅ Redirect to welcomePage1 to collect more data
      router.push('/(auth)/welcome/welcomePage1');

      // ✅ Reset Fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setVerifyPassword('');
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
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
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Verify Password"
          placeholderTextColor="#aaa"
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          secureTextEntry={true}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}
