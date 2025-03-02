import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from '../../tailwind';

export default function PetScreen() {
  const router = useRouter();

  // Array containing both GIF and video files
  const mediaFiles = [
    { type: 'gif', source: require('../../assets/med-cat.gif') },
    { type: 'gif', source: require('../../assets/tiny-cat.gif') },
    { type: 'gif', source: require('../../assets/big-cat.gif') },
    { type: 'video', source: require('../../assets/big-cat.mp4') },
    { type: 'image', source: require('../../assets/big-cat.png') },
    { type: 'image', source: require('../../assets/med-cat.png') },
    { type: 'image', source: require('../../assets/tiny-cat.png') },
  ];

  // Track the current media index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to cycle through media every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to navigate to the next page
  const nextPage = () => {
    router.push('workout/workoutSession');
  };

  const currentMedia = mediaFiles[currentIndex];

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <View pointerEvents="none">
        {currentMedia.type === 'gif' ? (
          <Image
            source={currentMedia.source}
            resizeMode="cover"
            style={tw`w-72 h-72 rounded-lg`}
          />
        ) : (
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
        )}
      {currentMedia.type === 'image' && (
        <Image
          source={currentMedia.source}
          resizeMode="cover"
          style={tw`w-72 h-72 rounded-lg`}
        />
      )}
      
      </View>

      {/* Floating Action Button to navigate */}
      <FAB
        style={tw`absolute bottom-10 right-10 bg-green-500`}
        icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
        onPress={nextPage}
      />
    </View>
  );
}