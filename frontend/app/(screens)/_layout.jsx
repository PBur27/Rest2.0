import { Stack } from 'expo-router';
import React from 'react';


export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="ActivityScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="test"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}