import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getFirestore
} from 'firebase/firestore';
import { Platform } from "react-native";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

export const app = initializeApp(firebaseConfig);
let auth;

// Initialize auth based on platform
if (Platform.OS !== 'web') {
  // Initialize Firebase Auth with React Native persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  // For web, use default initialization
  auth = initializeAuth(app);
}

const db = getFirestore(app);

export async function anonymousLogin() {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    await signInAnonymously(auth);

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

export async function loginOrRegister(userId) {
  try {
    const userRef = doc(db, "users", userId); // reference to user document
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // User doesn't exist → register
      await setDoc(userRef,{});
      console.log("User registered:", userId);
    } else {
      console.log("User exists:", userId);
    }

    return userId; // pass it back to setUid
  } catch (error) {
    console.error("Error checking/creating user:", error);
    throw error;
  }
}

export function logActivityToDatabase(userId, entryData) {
  const activityRef = collection(db, 'users', userId, entryData.activity);
  if (entryData.activity === 'workout' && entryData.data.length > 0) {
    const exercises = []
    for (const exercise of entryData.data) {
      const exerciseDocRef = doc(db, 'exercises', exercise['name'])
      exercises.push({
        exerciseDocRef,
        intensity: exercise['intensity']
      });
    }
    addDoc(activityRef, {
      date: serverTimestamp(),
      exercises: exercises,
    });
  }
  else {
    console.log("Error adding activity to db")
  }
}
