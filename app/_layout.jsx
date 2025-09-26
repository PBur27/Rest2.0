import { Stack } from "expo-router";
import { AuthProvider } from "./AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false,
        animation: "fade"
      }}>
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
