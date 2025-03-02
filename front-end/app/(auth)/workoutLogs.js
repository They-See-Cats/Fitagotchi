import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import tw from '../../tailwind';

// Global object storing logged workout dates
export let selectedDatesGlobal = {
  "2025-02-24": true,
  "2025-02-28": true,
};

// Function to save a workout date
export function saveDateToLogs(dateKey) {
  selectedDatesGlobal[dateKey] = true; // Save globally
  Alert.alert("Workout Logged", `Your workout on ${dateKey} has been saved.`);
}

// Function to format a date as YYYY-MM-DD
export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export default function MonthlyCalendar() {
  const [selectedDates, setSelectedDates] = useState({ ...selectedDatesGlobal });

  // Sync global selected dates when screen is focused
  useFocusEffect(
    useCallback(() => {
      setSelectedDates({ ...selectedDatesGlobal }); // Refresh calendar with latest logged dates
    }, [])
  );

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header Section */}
      <View style={[tw`p-4 rounded-b-3xl shadow-md`, { backgroundColor: '#313B72' }]}>
      <Text style={tw`text-xl font-bold text-white text-center`}>Workout Calendar</Text>
      </View>


      {/* Always Visible Scrollable Calendar */}
      <View style={tw`px-4 pb-4 pt-6`}>
      <Calendar
      markingType="custom"
      markedDates={Object.keys(selectedDates).reduce((acc, date) => {
        const isToday = date === formatDate(new Date());

        acc[date] = { 
          selected: true, 
          selectedColor: isToday ? '#016FB9' : '#4DA6FF' // Deep blue for today, light blue for others
        };

        return acc;
      }, {})}
      enableSwipeMonths={true} // Allows scrolling between months
      theme={{
        backgroundColor: 'white',
        calendarBackground: 'white',
        textSectionTitleColor: '#2E7D32', // Green headers
        selectedDayTextColor: 'white',
        todayBackgroundColor: '#D3D3D3', // Grey circle around today's date
        dayTextColor: '#333',
        textDisabledColor: '#D1D5DB', // Light gray for non-month days
        arrowColor: '#2E7D32', // Navigation arrows
        monthTextColor: '#2E7D32',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
      }}
      onDayPress={() => {}} // Read-only mode
    />

      </View>
    </ScrollView>
  );
}
