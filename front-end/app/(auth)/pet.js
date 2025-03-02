import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ImageBackground, StyleSheet, Alert, TouchableOpacity, Text, AppState } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

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
  const [level, setLevel] = useState(3);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isScreenActive, setIsScreenActive] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsScreenActive(true);
      return () => setIsScreenActive(false);
    }, [])
  );

  useEffect(() => {
    let timer;
    if (heartIndex > 0 && isScreenActive && appState === "active" && !isAlertOpen && level > 0) {
      timer = setInterval(() => {
        setHeartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [heartIndex, isScreenActive, appState, isAlertOpen, level]);

  useEffect(() => {
    if (heartIndex === 0 && isScreenActive && !isAlertOpen && level > 0) {
      setIsAlertOpen(true);

      if (level > 1) {
        Alert.alert(
          "Your level just went down!",
          "Your cat lost its age. Get back to working out or you will lose your cat soon!",
          [{ text: "OK", onPress: () => handleAlertDismiss() }]
        );
      } else {
        Alert.alert(
          "You lost your cat!",
          "But you can still get them back if you go back to working out!",
          [{ text: "OK", onPress: () => handleAlertDismiss() }]
        );
      }
    }
  }, [heartIndex, isScreenActive, isAlertOpen, level]);

  const handleAlertDismiss = () => {
    if (level > 1) {
      setLevel((prevLevel) => prevLevel - 1);
      setMediaIndex((prevIndex) => Math.min(prevIndex + 1, mediaFiles.length - 1));
      setHeartIndex(6); // Reset hearts only if there's still a level left
    } else {
      setMediaIndex(-1); // Hide the cat
      setHeartIndex(-1); // Hide the hearts
    }
    setIsAlertOpen(false);
  };

  const nextPage = () => {
    router.push('workout/workoutSession');
  };

  const handleTimerClick = () => {
    if (mediaIndex > 0) setMediaIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover">
        
        {/* Show hearts only if the level is above 0 */}
        {level > 0 && (
          <TouchableOpacity style={styles.heartsContainer} onPress={handleTimerClick}>
            <Image source={heartStates[heartIndex]} style={styles.heartImage} />
          </TouchableOpacity>
        )}

        {/* Show the cat if level > 0, else show motivational text */}
        <View style={styles.mediaContainer} pointerEvents="none">
          {level > 0 && mediaIndex !== -1 && mediaFiles[mediaIndex] ? (
            mediaFiles[mediaIndex].type === 'gif' ? (
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
            )
          ) : (
            <><Text style={styles.missingText}>
                Missing your cat?
              </Text><Text style={styles.missingText}>
                  You can get them back by simply clicking on the green icon and working out!
                </Text></>
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
  mediaContainer: {
    width: '80%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: 250,
    height: 250,
  },
  missingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Set text color to black
    padding: 10,
  },  
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'green',
  },
});
