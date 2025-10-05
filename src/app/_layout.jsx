import { Stack } from "expo-router";
import { AuthProvider } from "./AuthContext";
import { useFonts } from '@expo-google-fonts/bayon/useFonts';
import { Bayon_400Regular } from '@expo-google-fonts/bayon/400Regular';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Bayon_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
