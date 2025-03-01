import { View, Text } from 'react-native';
import tw from '../../tailwind';

export default function WorkoutLogs() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Workout Logs</Text>
    </View>
  );
}