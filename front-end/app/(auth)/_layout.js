import { useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';

export default function AppLayout() {
  const systemTheme = useColorScheme(); // Detect system theme

  useEffect(() => {
    if (systemTheme !== 'dark') {
      Appearance.setColorScheme('dark'); // Prevent system override
    }
  }, [systemTheme]);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-900`}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#1a202c',
            height: 60,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: '#1a202c',
          },
          headerTintColor: '#fff',
        }}>
        
        <Tabs.Screen
          name="workoutLogs"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="clipboard" size={28} color={color} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="pet"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="paw" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={28} color={color} />
            ),
          }}
        />
        
      </Tabs>
    </SafeAreaView>
  );
}
