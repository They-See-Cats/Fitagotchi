import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ImageBackground, Alert, Text, AppState } from 'react-native';
import { Video } from 'expo-av';
import { FAB } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
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
  const [mediaIndex, setMediaIndex] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isScreenActive, setIsScreenActive] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Hardcoded XP and Level
  const level = 3;
  const xp = 75; // XP out of 100

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
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [heartIndex, isScreenActive, appState, isAlertOpen]);

  useEffect(() => {
    if (heartIndex === 0 && isScreenActive && !isAlertOpen) {
      setIsAlertOpen(true);
      Alert.alert(
        level > 1 ? "Your level just went down!" : "You lost your cat!",
        level > 1
          ? "Your cat lost its age. Get back to working out or you will lose your cat soon!"
          : "But you can still get them back if you go back to working out!",
        [{ text: "OK", onPress: () => setIsAlertOpen(false) }]
      );
    }
  }, [heartIndex, isScreenActive, isAlertOpen]);

  const nextPage = () => {
    router.push('/workout/workoutSession');
  };

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
            <View style={tw`items-center`}>
              <Text style={tw`text-lg font-bold text-black`}>Missing your cat?</Text>
              <Text style={tw`text-lg font-semibold text-gray-700`}>
                You can get them back by clicking on the green icon and working out!
              </Text>
            </View>
          )}
        </View>

        {/* Workout Button */}
        <FAB
          style={tw`absolute bottom-10 right-5 bg-green-500`}
          icon={() => <FontAwesome name="heartbeat" size={24} color="white" />}
          onPress={nextPage}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
