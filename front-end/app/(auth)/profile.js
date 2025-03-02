import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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
    
    console.log('🔍 Fetching user data for ID:', user?.id);

    const { data, error } = await supabase
      .from('Users') // Ensure table name is correct ('users' if needed)
      .select('first_name, last_name, email, username, pet_type, num_days, xp, level')
      .eq('id', user?.id)
      .maybeSingle(); 

    if (error) {
      console.error('🚨 Error fetching user data:', error);
    } else {
      console.log('✅ Fetched User Data:', data);
      setUserData(data);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <ScrollView contentContainerStyle={tw`p-6`} showsVerticalScrollIndicator={false}>
        <View style={tw`bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md self-center`}>
          
          {/* Profile Header */}
          <View style={tw`items-center mb-4`}>
            <Text style={tw`text-2xl font-bold text-white`}>Profile</Text>
          </View>

          {/* Loading Indicator */}
          {loading ? (
            <ActivityIndicator size="large" color="#4F46E5" />
          ) : (
            <>
              {/* Information Section */}
              <Text style={tw`text-xl font-semibold text-white mb-2`}>Info:</Text>
              <Text style={tw`text-lg text-gray-300 mb-1`}>Name: {userData?.first_name || "NA"} {userData?.last_name || ""}</Text>
              <Text style={tw`text-lg text-gray-300 mb-1`}>Username: {userData?.username || "NA"}</Text>
              <Text style={tw`text-lg text-gray-300 mb-1`}>Pet: {userData?.pet_type || "NA"}</Text>

              {/* Stats Section */}
              <Text style={tw`text-xl font-semibold text-white mb-2`}>Stats:</Text>
              <Text style={tw`text-lg text-gray-300 mb-1`}>XP: {userData?.xp || 0}</Text>
              <Text style={tw`text-lg text-gray-300 mb-1`}>Level: {userData?.level || 1}</Text>
              <Text style={tw`text-lg text-gray-300 mb-4`}>Days Active: {userData?.num_days || 0}</Text>

              {/* Settings Section */}
              <Text style={tw`text-xl font-semibold text-white mb-2`}>Settings:</Text>

              {/* Email Field */}
              <View style={tw`flex-row items-center bg-gray-700 p-3 rounded-lg mb-4`}>
                <TextInput
                  style={tw`text-lg flex-1 text-white`}
                  placeholder={userData?.email || user?.email || "NA"}
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
      </ScrollView>
    </View>
  );
}
