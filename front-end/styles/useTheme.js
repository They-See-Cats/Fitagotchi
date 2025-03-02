import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (newTheme) => {
    await AsyncStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return { theme, changeTheme };
}
