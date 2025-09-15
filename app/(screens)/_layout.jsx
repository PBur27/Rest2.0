
import React from 'react'
import { Stack } from 'expo-router'

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
        name="LoginScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}