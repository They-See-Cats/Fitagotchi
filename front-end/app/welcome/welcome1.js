import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import supabase from '../../utils/supabaseClient';
import { router } from 'expo-router';

export default function WelcomeScreen1() {
  const { user } = useAuth(); // Get logged-in user
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkUsernameAvailability = async (username) => {
    const { data, error } = await supabase
      .from('Users')
      .select('id')
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking username:', error);
      return false;
    }

    return !data; // If `data` exists, username is taken; otherwise, it's available
  };

  const savePreferences = async () => {
    if (!user) return;

    if (!username.trim()) {
      setErrorMessage('Username cannot be empty.');
      return;
    }

    // ✅ Check if the username is unique
    const isUnique = await checkUsernameAvailability(username);
    if (!isUnique) {
      setErrorMessage('Username is already taken. Choose another one.');
      return;
    }

    // ✅ Update the username in the database
    const { error } = await supabase
      .from('Users')
      .update({ username })
      .eq('id', user.id);

    if (error) {
      console.error('Error saving username:', error);
      Alert.alert('Error', 'Could not save username. Please try again.');
    } else {
      router.push('/(auth)/welcome/welcomePage2'); // Move to next onboarding step
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Choose a Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }}
      />
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={savePreferences} style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
