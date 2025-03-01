import { View, Text } from 'react-native';
import tw from '../../tailwind';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function PetScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Pet Screen</Text>
      <FAB
        style={tw`absolute bottom-10 right-10`}
        icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
        onPress={() => router.push('../workout/workoutSession')}
      />
    </View>
  );
}