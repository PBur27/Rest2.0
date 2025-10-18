import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);
let auth;

// Initialize auth based on platform
if (Platform.OS !== "web") {
  // Initialize Firebase Auth with React Native persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  // For web, use default initialization
  auth = initializeAuth(app);
}

const db = getFirestore(app);

export async function anonymousLogin() {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized");
  }

  try {
    await signInAnonymously(auth);

    // Return a promise that resolves when the auth state changes
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            resolve(user.uid); // resolve with UID
            unsubscribe(); // stop listening after successful auth
          } else {
            reject(new Error("No user found"));
            unsubscribe(); // stop listening after failure
          }
        },
        (error) => {
          reject(error);
          unsubscribe(); // stop listening after error
        }
      );
    });
  } catch (error) {
    console.error("Anonymous login error:", error.code, error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function loginOrRegister(userId) {
  try {
    const userRef = doc(db, "users", userId); // reference to user document
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // User doesn't exist → register
      await setDoc(userRef, {});
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
  const activityRef = collection(db, "users", userId, entryData.activity);
  if (entryData.activity === "workout" && entryData.data.length > 0) {
    const exercises = [];
    for (const exercise of entryData.data) {
      const exerciseDocRef = doc(db, "exercises", exercise["name"]);
      exercises.push({
        exerciseDocRef,
        intensity: exercise["intensity"],
      });
    }
    addDoc(activityRef, {
      date: serverTimestamp(),
      exercises: exercises,
    });
  } else {
    console.log("Error adding activity to db");
  }
}

export async function fetchUserData(userId) {
  const workoutRef = collection(db, "users", userId, "workout");
  const sleepRef = collection(db, "users", userId, "sleep");
  const dietRef = collection(db, "users", userId, "diet");

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const workoutDocs = await getDocs(
    query(workoutRef, where("date", ">=", sevenDaysAgo))
  );
  const sleepDocs = await getDocs(
    query(sleepRef, where("date", ">=", sevenDaysAgo))
  );
  const dietDocs = await getDocs(
    query(dietRef, where("date", ">=", sevenDaysAgo))
  );

  const days = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); // clone
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dayStr = `${y}-${m}-${dd}`; // local YYYY-MM-DD
    days[dayStr] = {};
  }

  const workoutData = workoutDocs.forEach((doc) => {
    const data = doc.data();
    const { date, exercises } = data;
    const jsDate = date.toDate();
    const day = jsDate.toISOString().split("T")[0];
    if (!days[day]) {
      days[day] = {};
    }
    if (!days[day]["exercises"]) {
      days[day]["exercises"] = [];
    }
    days[day]["exercises"].push(...exercises);
    return days;
  });
  const sleepData = sleepDocs.forEach((doc) => {
    const data = doc.data();
    const { date, sleepHours } = data;
    const jsDate = date.toDate();
    const day = jsDate.toISOString().split("T")[0];
    if (!days[day]) {
      days[day] = {};
    }
    if (!days[day]["sleep"]) {
      days[day]["sleep"] = [];
    }
    days[day]["sleep"].push(sleepHours);
    return days;
  });
  const dietData = dietDocs.forEach((doc) => {
    const data = doc.data();
    const { date, calories, protein } = data;
    const jsDate = date.toDate();
    const day = jsDate.toISOString().split("T")[0];
    if (!days[day]) {
      days[day] = {};
    }
    if (!days[day]["diet"]) {
      days[day]["diet"] = [];
    }
    days[day]["diet"].push({ calories, protein });
    return days;
  });

  const daysArray = Object.entries(days)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, data]) => ({ date, ...data }));

  return daysArray;
}
