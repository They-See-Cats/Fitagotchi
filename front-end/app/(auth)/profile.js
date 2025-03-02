import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import supabase from '../../utils/supabaseClient';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useAuth(); // Get logged-in user from AuthProvider
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace('/login'); // Redirect if not logged in
    } else {
      fetchUserData(); // Fetch user info from database
    }
  }, [user]);

  const fetchUserData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Users') // Make sure your table name is correct
      .select('name, email')
      .eq('id', user.id) // Match with Supabase Auth user ID
      .single(); // Fetch only one record

    if (error) {
      console.error('Error fetching user data:', error);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login'); // Redirect to login page
  };

  if (!user) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text>Name: {userData?.name || 'N/A'}</Text>
          <Text>Email: {userData?.email || user.email}</Text>
        </>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
