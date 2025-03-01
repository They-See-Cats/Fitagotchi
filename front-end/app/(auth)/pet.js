import { View, Text } from 'react-native';
import tw from '../../tailwind';

export default function PetScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Pet Screen</Text>
    </View>
  );
}