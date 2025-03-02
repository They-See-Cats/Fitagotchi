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
  );
}