import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from '../../tailwind';
import { useFocusEffect } from '@react-navigation/native';

// A global object to store selected dates
export let selectedDatesGlobal = {
  "2025-02-24": true,
  "2025-02-28": true,
};

/**
 * Named export: saveDateToLogs
 * Updates the global store with the provided date string (in "YYYY-MM-DD" format).
 */
export function saveDateToLogs(dateKey) {
  console.log("Before update, selectedDatesGlobal:", selectedDatesGlobal);
  selectedDatesGlobal[dateKey] = true;
  console.log("After update, selectedDatesGlobal:", selectedDatesGlobal);
  Alert.alert("Logs Updated", `Saved date: ${dateKey}`);
}

/**
 * Export the helper function so other files can format dates consistently.
 */
export const formatDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

// Helper: Get current date in US Central Time (Chicago)
const getCurrentCentralDate = () => {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
};

export default function MonthlyCalendar() {
  const year = 2025;
  const month = 2; // March (0-indexed)

  // Local state initializes from the global store.
  const [selectedDates, setSelectedDates] = useState({ ...selectedDatesGlobal });

  // When the screen is focused, update local state from the global store.
  useFocusEffect(
    useCallback(() => {
      setSelectedDates({ ...selectedDatesGlobal });
    }, [])
  );

  // Prepare the calendar grid.
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarStartDate = new Date(firstDayOfMonth);
  calendarStartDate.setDate(firstDayOfMonth.getDate() - firstWeekday);

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastWeekday = (lastDayOfMonth.getDay() + 6) % 7;
  const calendarEndDate = new Date(lastDayOfMonth);
  calendarEndDate.setDate(lastDayOfMonth.getDate() + (6 - lastWeekday));

  const totalDays = Math.ceil((calendarEndDate - calendarStartDate) / (1000 * 60 * 60 * 24)) + 1;
  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(calendarStartDate);
    date.setDate(calendarStartDate.getDate() + i);
    days.push(date);
  }

  const weeks = [];
  for (let i = 0; i < days.length / 7; i++) {
    weeks.push(days.slice(i * 7, i * 7 + 7));
  }

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={tw`p-4`}>
      {/* Centered Heading */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-center font-bold text-xl`}>March 2025</Text>
      </View>
      
      {/* Weekday header */}
      <View style={tw`flex-row justify-around mb-2`}>
        {dayNames.map((dayName, idx) => (
          <View key={idx} style={tw`w-10 items-center`}>
            <Text style={tw`font-bold`}>{dayName}</Text>
          </View>
        ))}
      </View>
      
      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={tw`flex-row justify-around`}>
          {week.map((date, dateIndex) => {
            const isCurrentMonth = date.getMonth() === month;
            const key = formatDate(date);
            const isSelected = selectedDates[key];
            return (
              // Deactivated onPress - calendar is now read-only.
              <TouchableOpacity 
                key={dateIndex} 
                activeOpacity={1}
                style={tw`w-10 h-10 border m-1 justify-center items-center ${isSelected ? '' : (isCurrentMonth ? '' : 'bg-gray-200')}`}
              >
                <View style={tw`absolute top-0 left-0 w-full h-full ${isSelected ? '' : 'bg-transparent'}`}
                      backgroundColor={isSelected ? "#78C091" : "transparent"} />
                <Text style={tw`text-center ${isSelected ? 'text-white' : (isCurrentMonth ? '' : 'text-gray-500')}`}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Removed Save Button - editing is deactivated */}
    </View>
  );
}
