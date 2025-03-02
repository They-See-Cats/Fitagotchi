import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// Import the save command and formatDate helper from your logs file.
import { saveDateToLogs, formatDate } from '../(auth)/workoutLogs'; 

// Helper: Get current date in US Central Time (Chicago) by extracting parts.
const getCurrentCentralDate = () => {
  const now = new Date();
  const options = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  const year = parts.find(part => part.type === 'year').value;
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  return new Date(`${year}-${month}-${day}T00:00:00`);
};

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
    return () => clearInterval(interval);
  }, [running, time]);

  useImperativeHandle(ref, () => ({
    reset() {
      setTime(0);
      setRunning(false);
    },
    pause() {
      setRunning(false);
    },
  }));

  const toggleStopwatch = () => setRunning(prev => !prev);
  const pad = (num) => num.toString().padStart(2, '0');

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
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

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
          onPress: () => {
            // Mark workout as ended and instruct the user to choose a date.
            setWorkoutEnded(true);
            Alert.alert("Workout Saved", "Your workout has been saved. Please choose the date.");
          },
        },
      ]
    );
  };

  const handleReset = () => {
    if (stopwatchRef.current) {
      stopwatchRef.current.reset();
    }
  };

  // When the calendar icon is pressed
  const handleCalendarIconPress = () => {
    const currentDate = getCurrentCentralDate();
    // Use formatDate to ensure consistent formatting, e.g., "2025-03-02"
    const dateKey = formatDate(currentDate);
    
    if (workoutEnded) {
      Alert.alert(
        "Today's Date",
        `Today's Date: ${dateKey} has been logged and saved.`,
        [
          {
            text: "OK",
            onPress: () => {
              setDateSelected(true);
              // Call the save command with the formatted date.
              saveDateToLogs(dateKey);
              // Navigate back to the main page.
              router.push('/pet');
            },
          },
        ]
      );      
    } else {
      Alert.alert("Current Date", dateKey);
    }
  };

  // Override the back arrow: if workout ended but no date has been selected, prevent exit.
  const handleBackPress = () => {
    if (workoutEnded && !dateSelected) {
      Alert.alert("Please Select a Date", "You must select the date before exiting.");
    } else {
      router.push('/pet');
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Back Arrow */}
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color="white" 
        onPress={handleBackPress} 
        style={styles.backArrow} 
      />

      {/* Calendar Icon on Top Right */}
      <Ionicons 
        name="calendar" 
        size={24} 
        color="white" 
        onPress={handleCalendarIconPress} 
        style={styles.calendarIcon} 
      />

      <Stopwatch ref={stopwatchRef} />
      
      {/* Modern Darker Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleReset} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.endButton]} onPress={handleWorkoutComplete} activeOpacity={0.8}>
        <Text style={styles.buttonText}>End Workout?</Text>
      </TouchableOpacity>
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
  calendarIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  stopwatchText: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    width: 180,
  },
  endButton: {
    backgroundColor: '#C62828',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WorkoutSession;