import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { Platform } from "react-native";
import { app } from "./firebase";

// Declare auth variable in the module scope
let auth;

// Initialize auth based on platform
if (Platform.OS !== 'web') {
  // Initialize Firebase Auth with React Native persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  // For web, use default initialization
  auth = initializeAuth(app);
}


export async function anonymousLogin() {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    await signInAnonymously(auth); // wait for sign-in to complete

    // Return a promise that resolves when the auth state changes
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid); // resolve with UID
          unsubscribe(); // stop listening after successful auth
        } else {
          reject(new Error("No user found"));
          unsubscribe(); // stop listening after failure
        }
      }, (error) => {
        reject(error);
        unsubscribe(); // stop listening after error
      });
    });
  } catch (error) {
    console.error('Anonymous login error:', error.code, error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
