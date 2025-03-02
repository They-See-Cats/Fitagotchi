import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import supabase from '../../utils/supabaseClient';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import tw from '../../tailwind';

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
      .from('Users') // ✅ Ensure correct table name (lowercase 'users' if needed)
      .select('first_name, last_name, email, username, pet_type, num_days, xp, level')
      .eq('id', user?.id) // ✅ Match user ID correctly
      .maybeSingle(); // ✅ Prevents errors if no rows exist

    if (error) {
      console.error('🚨 Error fetching user data:', error);
    } 
    setLoading(false);
};



  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login'); // Redirect to login page
  };

  return (
    <View style={tw`flex-1 bg-gray-900 p-6`}> 
      <View style={tw`bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md`}>
        
        {/* Profile Header */}
        <Text style={tw`text-xl font-semibold text-white mb-4`}>Profile</Text>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#4F46E5" />
        ) : (
          <>
            {/* Information Section */}
            <Text style={tw`text-xl font-semibold text-white mb-2`}>Information</Text>
            <Text style={tw`text-lg text-gray-300 mb-1`}>Name: {userData?.name || 'N/A'}</Text>
            <Text style={tw`text-lg text-gray-300 mb-4`}>Email: {userData?.email || user.email}</Text>

            {/* Stats Section */}
            <Text style={tw`text-xl font-semibold text-white mb-2`}>Stats</Text>
            <Text style={tw`text-lg text-gray-300 mb-1`}>Rank: Elite</Text>
            <Text style={tw`text-lg text-gray-300 mb-4`}>XP Level: 42</Text>

            {/* Settings Section */}
            <Text style={tw`text-xl font-semibold text-white mb-2`}>Settings</Text>

            {/* Email Field */}
            <View style={tw`flex-row items-center bg-gray-700 p-3 rounded-lg mb-4`}>
              <TextInput
                style={tw`text-lg flex-1 text-white`}
                placeholder={userData?.email || 'Email'}
                placeholderTextColor="lightgray"
                editable={false}
              />
              <TouchableOpacity>
                <FontAwesome name="pencil" size={20} color="lightgray" />
              </TouchableOpacity>
            </View>

            {/* Password Field */}
            <View style={tw`flex-row items-center bg-gray-700 p-3 rounded-lg mb-4`}>
              <TextInput
                style={tw`text-lg flex-1 text-white`}
                placeholder="********"
                placeholderTextColor="lightgray"
                secureTextEntry
                editable={false}
              />
              <TouchableOpacity>
                <FontAwesome name="pencil" size={20} color="lightgray" />
              </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={tw`bg-red-600 p-3 rounded-lg flex items-center mt-4`}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={tw`text-white text-lg font-medium`}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
