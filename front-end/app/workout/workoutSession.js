import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Wrap Stopwatch in forwardRef to expose reset and pause functions.
const Stopwatch = forwardRef((props, ref) => {
  const [time, setTime] = useState(0); // time in milliseconds
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 100);
      }, 100);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    // Cleanup on unmount or when running changes.
    return () => clearInterval(interval);
  }, [running, time]);

  // Expose reset and pause functions via ref.
  useImperativeHandle(ref, () => ({
    reset() {
      setTime(0);
      setRunning(false);
    },
    pause() {
      setRunning(false);
    },
  }));

  // Toggle the stopwatch running state.
  const toggleStopwatch = () => setRunning(prev => !prev);

  // Helper function to pad numbers with leading zeros.
  const pad = (num) => num.toString().padStart(2, '0');

  // Format time as "HH:MM.SS"
  const formatTime = () => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}.${pad(seconds)}`;
  };

  return (
    <TouchableOpacity onPress={toggleStopwatch}>
      <Text style={[styles.stopwatchText, { color: running ? '#78C091' : '#FF6B6B' }]}>
        {formatTime()}
      </Text>
    </TouchableOpacity>
  );
});

const WorkoutSession = () => {
  const stopwatchRef = useRef(null);

  const handleWorkoutComplete = () => {
    Alert.alert(
      'Are you sure you want to end the workout?',
      'Your pet will be happy to see you!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            if (stopwatchRef.current) {
              stopwatchRef.current.pause();
            }
          },
        },
        {
          text: 'End Workout',
          onPress: () => router.push('/pet'),
        },
      ]
    );
  };

  const handleReset = () => {
    if (stopwatchRef.current) {
      stopwatchRef.current.reset();
    }
  };

  return (
    <View style={styles.container}>
      <Stopwatch ref={stopwatchRef} />
      
      {/* Modern Darker Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleReset} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.endButton]} onPress={handleWorkoutComplete} activeOpacity={0.8}>
        <Text style={styles.buttonText}>End Workout?</Text>
      </TouchableOpacity>

      <Ionicons 
        name="arrow-back" 
        size={24} 
        color="white" 
        onPress={() => router.push('/pet')} 
        style={styles.backArrow} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  stopwatchText: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2E7D32', // Dark Green for Reset
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Android shadow
    width: 180, // Consistent button width
  },
  endButton: {
    backgroundColor: '#C62828', // Dark Red for End Workout
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WorkoutSession;
