import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Handles full screen including Dynamic Island

export default function PetScreen() {
  const router = useRouter();

  const heartStates = [
    require('../../assets/zero-heart.png'),
    require('../../assets/half-heart.png'),
    require('../../assets/one-heart.png'),
    require('../../assets/one-half-heart.png'),
    require('../../assets/two-heart.png'),
    require('../../assets/two-half-heart.png'),
    require('../../assets/three-heart.png'),
  ];

  const [heartIndex, setHeartIndex] = useState(6);

  // Decrement hearts every 5 seconds until 0, then show an alert
  useEffect(() => {
    // If we're above 0, schedule a 5-second timer to lose half a heart
    if (heartIndex > 0) {
      const timer = setTimeout(() => {
        setHeartIndex((prevIndex) => prevIndex - 1);
      }, 5000);

      return () => clearTimeout(timer);
    } 
    // If heartIndex is 0, show alert
    else {
      Alert.alert(
        "Try again next time!",
        "Would you like to continue or go home?",
        [
          {
            text: "Continue",
            onPress: () => {
              console.log("Continue pressed");
              setHeartIndex(6);
            },
          },
          {
            text: "Home",
            onPress: () => {
              router.push('/');
            },
          },
        ]
      );
    }
  }, [heartIndex]);

  // ---- Existing code for cycling through GIF/Video ----
  const mediaFiles = [
    { type: 'gif', source: require('../../assets/SmallOrangeCat.gif') }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentMedia = mediaFiles[currentIndex];

  // ---- Navigate to next page when FAB is pressed ----
  const nextPage = () => {
    router.push('workout/workoutSession');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.background}
        resizeMode="cover"
      >
        {/* Hearts container at top-center */}
        <View style={styles.heartsContainer}>
          {/* Display the current heart image based on heartIndex */}
          <Image 
            source={heartStates[heartIndex]} 
            style={styles.heartImage}
          />
        </View>

        {/* Pet media (GIF or Video) */}
        <View pointerEvents="none">
          {currentMedia.type === 'gif' ? (
            <Image
              source={currentMedia.source}
              resizeMode="contain"
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

        {/* Floating Action Button */}
        <FAB
          style={styles.fab}
          icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
          onPress={nextPage}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

// ---- Styles ----
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
  heartsContainer: {
    position: 'absolute',
    top: 50, // adjust as needed
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  heartImage: {
    width: 150, // adjust to match your image's aspect ratio
    height: 50,
    resizeMode: 'contain',
  },
  media: {
    width: 250, 
    height: 250, 
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'green',
  },
});