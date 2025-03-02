import { useEffect } from 'react';
import { Appearance, useColorScheme, ImageBackground } from 'react-native';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';
import { AuthProvider } from "../../context/AuthProvider"; 
import BottomNavBar from '../../components/BottomNavBar'; // Import custom navbar

export default function AppLayout() {
  const systemTheme = useColorScheme(); // Detect system theme

  useEffect(() => {
    if (systemTheme !== 'dark') {
      Appearance.setColorScheme('dark'); // Prevent system override
    }
  }, [systemTheme]);

  return (
    <AuthProvider>
        <SafeAreaView style={tw`flex-1 bg-gray-900`}>
          {/* Hidden Tab Navigation */}
          <Tabs
            screenOptions={{
              tabBarStyle: { display: 'none' }, // Hide the default navbar
              headerShown: false, // Hide the header
            }}
          >
            <Tabs.Screen name="workoutLogs" />
            <Tabs.Screen name="pet" />
            <Tabs.Screen name="profile" />
          </Tabs>
        </SafeAreaView>

        {/* Custom Bottom Navigation */}
        <BottomNavBar />
    </AuthProvider>
  );
}
