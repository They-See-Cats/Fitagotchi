import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { router } from 'expo-router';
import tw from '../../tailwind';

export default function WelcomeLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login');
      }
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/login');
        return;
      }
      
      setUser(session.user);
    } catch (error) {
      console.error('Error checking auth status:', error);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-green-400 text-lg`}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1F2937', // Dark gray to match your theme
        },
        headerTintColor: '#4ADE80', // Green to match your color scheme
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="welcome1"
        options={{
          title: 'Welcome',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/')}>
              <Ionicons name="home" size={24} color="#4ADE80" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Add other welcome screens here as needed */}
    </Stack>
  );
}