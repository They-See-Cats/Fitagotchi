import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
      }}>
      
      <Tabs.Screen
        name="workoutLogs"
        options={{
          title: 'workoutLogs',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="clipboard" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="pet"
        options={{
          title: 'Pet',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      
      
    </Tabs>
  );
}