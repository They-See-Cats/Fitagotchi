import React, { useState } from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from '../../tailwind';

export default function PetScreen() {
  const router = useRouter();

  // Single array containing media info
  const mediaFiles = [
    { name: 'big-cat.mp4', source: require('../../assets/big-cat.mp4') },
    { name: 'test.mp4', source: require('../../assets/test.mp4') }
    // Add more media objects as needed
  ];

  // Track the current index in state. Start at 0 for the first file.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to transition to the next media file
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const nextPage = () => {
    router.push('workout/workoutSession');
  }

  const currentMedia = mediaFiles[currentIndex];

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <View pointerEvents="none">
        <Video
          source={currentMedia.source}
          rate={1.0}
          volume={0.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          style={tw`w-72 h-72 rounded-lg`}
        />
      </View>

      {/* FAB triggers the transition to the next media file */}
      <FAB
        style={tw`absolute bottom-10 right-10 bg-green-500`}
        icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
        onPress={nextPage}
      />
    </View>
  );
}