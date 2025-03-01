import { View } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from '../../tailwind';

export default function PetScreen() {
  const router = useRouter();

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <View pointerEvents="none">
        <Video
          source={require('../../assets/big-cat.mp4')}
          rate={1.0}
          volume={0.0} 
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={tw`w-72 h-72 rounded-lg`}
        />
      </View>
      <FAB
        style={tw`absolute bottom-10 right-10 bg-green-500`}
        icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
        onPress={() => router.push('../workout/workoutSession')}
      />
    </View>
  );
}