import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { ExpoRouter } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    Appearance.setColorScheme('dark'); // Force dark mode globally
  }, []);

  return (
    <SafeAreaProvider>
      <ExpoRouter />
    </SafeAreaProvider>
  );
}
