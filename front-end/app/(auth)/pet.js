import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Handles full screen including Dynamic Island

export default function PetScreen() {
  const router = useRouter();

  // Array containing both GIF and video files
  const mediaFiles = [
    { type: 'gif', source: require('../../assets/SmallOrangeCat.gif') }
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
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.background}
        resizeMode="cover"
      >
        <View pointerEvents="none">
          {currentMedia.type === 'gif' ? (
            <Image
              source={currentMedia.source}
              resizeMode="contain" // ✅ Ensures it fits without cropping
              style={styles.media}
            />
          ) : (
            <Video
              source={currentMedia.source}
              rate={1.0}
              volume={0.0}
              isMuted
              resizeMode="contain"
              shouldPlay
              isLooping
              style={styles.media}
            />
          )}
        </View>

        {/* Floating Action Button to navigate */}
        <FAB
          style={styles.fab}
          icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
          onPress={nextPage}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: 250, // Adjust size as needed
    height: 250, 
  },
  fab: {
    position: 'absolute',
    bottom: 40, // Adjust so it doesn't overlap with the iPhone home bar
    right: 20,
    backgroundColor: 'green',
  },
});

