import { initializeAuth, signInAnonymously, onAuthStateChanged, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app } from "./firebase";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export async function anonymousLogin() {
  try {
    await signInAnonymously(auth); // wait for sign-in to complete

    // Return a promise that resolves when the auth state changes
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid); // resolve with UID
        } else {
          reject(new Error("No user found"));
        }
        unsubscribe(); // stop listening after first event
      }, reject);
    });
  } catch (error) {
    console.error(error.code, error.message);
  }
}
