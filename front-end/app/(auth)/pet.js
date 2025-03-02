import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Alert, TouchableOpacity, AppState } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const mediaFiles = [
    { type: 'gif', source: require('../../assets/OrangeCat3.gif') },
    { type: 'gif', source: require('../../assets/OrangeCat2.gif') },
    { type: 'gif', source: require('../../assets/OrangeCat1.gif') },
  ];

  const [heartIndex, setHeartIndex] = useState(6);
  const [level, setLevel] = useState(3); // Assuming level starts at 3
  const [mediaIndex, setMediaIndex] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (heartIndex > 0 && appState === "active") {
      const timer = setTimeout(() => {
        setHeartIndex((prevIndex) => prevIndex - 1);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (heartIndex === 0) {
      if (level > 1) {
        Alert.alert(
          "Your level just went down!",
          "Your cat lost its age. Get back to working out or you will lose your cat soon!",
          [{ text: "OK", onPress: () => setHeartIndex(6) }]
        );
        setLevel((prevLevel) => prevLevel - 1);
        setMediaIndex((prevIndex) => Math.min(prevIndex + 1, mediaFiles.length - 1));
      } else {
        Alert.alert(
          "You lost your cat!",
          "But you can still get them back if you go back to working out!",
          [{ text: "OK", onPress: () => setHeartIndex(6) }]
        );
      }
    }
  }, [heartIndex, appState]);

  const nextPage = () => {
    router.push('workout/workoutSession');
  };

  const handleTimerClick = () => {
    setMediaIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover">
        <TouchableOpacity style={styles.heartsContainer} onPress={handleTimerClick}>
          <Image source={heartStates[heartIndex]} style={styles.heartImage} />
        </TouchableOpacity>

        <View pointerEvents="none">
          {mediaFiles[mediaIndex].type === 'gif' ? (
            <Image source={mediaFiles[mediaIndex].source} resizeMode="contain" style={styles.media} />
          ) : (
            <Video
              source={mediaFiles[mediaIndex].source}
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
  heartsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  heartImage: {
    width: 150,
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