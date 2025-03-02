import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { usePathname, router } from 'expo-router';
import tw from '../tailwind'; // Import Tailwind config

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <View style={tw`flex-row justify-around bg-black py-3 w-full absolute bottom-0 h-[110px]`}>
        <View style={tw`flex flex-row gap-[100px]`}>
            {/* Left Button */}
            <TouchableOpacity onPress={() => router.push('/(auth)/workoutLogs')} style={tw`p-3`}>
                <FontAwesome5 name="list-alt" size={24} color={pathname === '/workoutLogs' ? '#fff' : '#ccc'} />
            </TouchableOpacity>

            {/* Center Button */}
            <TouchableOpacity onPress={() => router.push('/(auth)/pet')} style={tw`p-3`}>
                <FontAwesome5 name="paw" size={30} color={pathname === '/pet' ? '#fff' : '#ccc'} />
            </TouchableOpacity>

            {/* Right Button */}
            <TouchableOpacity onPress={() => router.push('/(auth)/profile')} style={tw`p-3`}>
                <FontAwesome5 name="user-circle" size={24} color={pathname === '/profile' ? '#fff' : '#ccc'} />
            </TouchableOpacity>
        </View>
    </View>
  );
}