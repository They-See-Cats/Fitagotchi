import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Image, ImageBackground, Alert, Text, AppState, Animated } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import tw from '../../tailwind';

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
  const [xp, setXp] = useState(75);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isScreenActive, setIsScreenActive] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const glowAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

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
    if (heartIndex > 0 && isScreenActive && appState === "active" && !isAlertOpen) {
      timer = setInterval(() => {
        setHeartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [heartIndex, isScreenActive, appState, isAlertOpen]);

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
  }, [heartIndex, isScreenActive, isAlertOpen]);

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
    router.push('/workout/workoutSession');
  };

  // Glow animation when the cat is missing
  useEffect(() => {
    if (mediaIndex === -1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      glowAnim.setValue(1); // Reset opacity if the cat is back
    }
  }, [mediaIndex]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ImageBackground
        source={require('../../assets/petBackground.png')}
        style={tw`flex-1 justify-center items-center mt-[-200px]`}
        resizeMode="cover"
      >
        {/* XP Bar and Level Display */}
        <View style={tw`absolute top-10 w-5/6 items-center pt-[200px]`}>
          <Text style={tw`text-lg font-bold text-white`}>Level: {level}</Text>
          <View style={tw`w-full h-4 bg-gray-300 rounded-full mt-1`}>
            <View style={[tw`h-full bg-green-500 rounded-full`, { width: `${xp}%` }]} />
          </View>
        </View>

        {/* Hearts - non-clickable */}
        {level > 0 && (
          <View style={tw`absolute top-20`}>
            <Image source={heartStates[heartIndex]} style={tw`w-36 h-12 mt-[350px]`} />
          </View>
        )}

        {/* Cat Image */}
        <View style={tw`flex-1 justify-center items-center pt-[400px]`}>
          {level > 0 && mediaIndex !== -1 && mediaFiles[mediaIndex] ? (
            mediaFiles[mediaIndex].type === 'gif' ? (
              <Image source={mediaFiles[mediaIndex].source} resizeMode="contain" style={tw`w-64 h-64`} />
            ) : (
              <Video
                source={mediaFiles[mediaIndex].source}
                rate={1.0}
                volume={0.0}
                isMuted
                resizeMode="contain"
                shouldPlay
                isLooping
                style={tw`w-64 h-64`}
              />
            )
          ) : (
            <View style={tw`flex flex-col justify-center items-center`}>
              <Text style={tw`text-lg font-bold text-black`}>Missing your cat?</Text>
              <Text style={tw`text-lg font-bold text-black`}>
                You can get them back by working out!
              </Text>
              <Image source={require('../../assets/sign.png')} style={tw`w-64 h-64`} />
            </View>
          )}
        </View>

        {/* Workout Button with Glow Animation */}
        <Animated.View 
        style={[
          tw`absolute bottom-10 right-5`,{ opacity: mediaIndex === -1 ? glowAnim : 10 } ]}>

        <FAB
          style={{ backgroundColor: "#4B5BAB" }}
          icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
          onPress={nextPage}
        />

        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}
