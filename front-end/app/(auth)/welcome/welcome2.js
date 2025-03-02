import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../../../context/AuthProvider';
import supabase from '../../../utils/supabaseClient';
import { router } from 'expo-router';

export default function WelcomeScreen2() {
  const { user } = useAuth(); // Get logged-in user
  const [preferredDays, setPreferredDays] = useState('');

  const savePreferences = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('Users')
      .update({ workout_days: preferredDays })
      .eq('id', user.id);

    if (error) {
      console.error('Error saving preferences:', error);
    } else {
      router.push('/(auth)/welcomePage2'); // Move to next onboarding step
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Choose Your Workout Days</Text>
      <TextInput
        placeholder="Enter days (e.g., Mon, Wed, Fri)"
        value={preferredDays}
        onChangeText={setPreferredDays}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TouchableOpacity onPress={savePreferences} style={{ backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white' }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
