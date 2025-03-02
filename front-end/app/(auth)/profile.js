import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from '../../tailwind';

export default function ProfileScreen() {
  return (
    <View style={tw`flex-1 bg-gray-900 p-6`}> 
      <View style={tw`bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md`}> 
        
        {/* Information Section */}
        <Text style={tw`text-xl font-semibold text-white mb-2`}>Information</Text>
        <Text style={tw`text-lg text-gray-300 mb-1`}>First Name: John</Text>
        <Text style={tw`text-lg text-gray-300 mb-4`}>Last Name: Doe</Text>
        
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
            placeholder="johndoe@example.com"
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
      </View>
    </View>
  );
}