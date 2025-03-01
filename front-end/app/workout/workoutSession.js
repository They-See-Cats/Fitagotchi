import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const WorkoutSession = () => {
  const handleWorkoutComplete = () => {
    // Navigate to pet screen (which can then fetch the new media via getCurrentMedia)
    router.push('/pet');
  };

  return (
    <View style={styles.container}>
      <Button title="Workout Completed" onPress={handleWorkoutComplete} />
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color="black" 
        onPress={() => router.push('/pet')} 
        style={styles.backArrow} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});

export default WorkoutSession;
