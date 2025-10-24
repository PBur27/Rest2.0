import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Platform } from "react-native";
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
  }
}

export async function loginOrRegister(userId) {
  try {
    const userRef = doc(db, "users", userId); // reference to user document
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // login user if exists, register if doesn't
      await setDoc(userRef, {});
      console.log("User registered:", userId);
    } else {
      console.log("User exists:", userId);
    }

    return userId; // return the new or existing id
  } catch (error) {
    console.error("Error checking/creating user:", error);
    throw error;
  }
}

export async function logActivityToDatabase(userId, entryData) {
  //choose collection based on entryData
  const activityRef = collection(db, "users", userId, entryData.activity);
  if (entryData.activity === "workout" && entryData.data.length > 0) {
    const exercises = [];
    for (const exercise of entryData.data) {
      //create reference to execrices collection
      const exerciseDocRef = doc(db, "exercises", exercise["name"]);
      exercises.push({
        exerciseDocRef,
        intensity: exercise["intensity"],
      });
    }
    addDoc(activityRef, {
      date: entryData.data[0].id,
      exercises: exercises,
    });
  } else if (entryData.activity === "diet" && entryData.data.length > 0) {
    const diet = [];
    for (const meal of entryData.data) {
      diet.push({
        calories: meal.calories,
        protein: meal.protein,
      });
    }
    addDoc(activityRef, {
      date: entryData.data[0].id,
      meals: diet,
    });
  } else if (entryData.activity === "sleep" && entryData.data.length > 0) {
    const sleep = [];
    for (const nap of entryData.data) {
      sleep.push({
        bedtime: nap.bedtime,
        sleepHours: nap.sleepHours,
      });
    }
    addDoc(activityRef, {
      date: entryData.data[0].id,
      sleep: sleep,
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

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    days.push({
      date: day,
      exercises: [],
      sleep: [],
      diet: [],
    });
  }
  const findMatchingDay = (date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    return days.find((day) => day.date.getTime() === targetDate.getTime());
  };

  workoutDocs.forEach((doc) => {
    const data = doc.data();
    const { date, exercises } = data;
    const jsDate = date.toDate();
    const matchingDay = findMatchingDay(jsDate);
    if (matchingDay && exercises) {
      matchingDay.exercises = [...matchingDay.exercises, ...exercises];
    }
  });

  sleepDocs.forEach((doc) => {
    const data = doc.data();
    const { date, sleep } = data;
    const jsDate = date.toDate();
    const matchingDay = findMatchingDay(jsDate);
    if (matchingDay && sleep) {
      matchingDay.sleep = [...matchingDay.sleep, ...sleep];
    }
  });

  dietDocs.forEach((doc) => {
    const data = doc.data();
    const { date, meals } = data;
    const jsDate = date.toDate();
    const matchingDay = findMatchingDay(jsDate);
    if (matchingDay && meals) {
      matchingDay.diet = [...matchingDay.diet, ...meals];
    }
  });

  days.sort((a, b) => a.date.getTime() - b.date.getTime());
  return days;
}
export async function getExerciseInfo(ref) {
  const exercise = await getDoc(ref);

  if (exercise.exists()) {
    return exercise.data().muscles;
  } else {
    console.warn("No such document!");
  }
}
function formatValuesForDisplay(exertionTotal) {
  for (const side in exertionTotal) {
    for (const muscle in exertionTotal[side]) {
      if (exertionTotal[side][muscle] > 0.7) {
        exertionTotal[side][muscle] = 3;
      } else if (exertionTotal[side][muscle] > 0.4) {
        exertionTotal[side][muscle] = 2;
      } else if (exertionTotal[side][muscle] > 0.2) {
        exertionTotal[side][muscle] = 1;
      } else {
        exertionTotal[side][muscle] = 0;
      }
    }
  }
}

export async function calculateExertion(days) {
  const exertionTotal = {
    front: {
      head: 0,
      traps: 0,
      shoulders: 0,
      chest: 0,
      lats: 0,
      biceps: 0,
      triceps: 0,
      forearms: 0,
      abs: 0,
      obliques: 0,
      quads: 0,
      calves: 0,
      feet: 0,
    },
    back: {
      head: 0,
      traps: 0,
      shoulders: 0,
      triceps: 0,
      forearms: 0,
      rhomboids: 0,
      lats: 0,
      erectorSpinae: 0,
      obliques: 0,
      glutes: 0,
      hamstrings: 0,
      calves: 0,
      feet: 0,
    },
  };
  for (const day of days) {
    let protein = 0;
    let sleep = 6;
    if (day.diet.length > 0) {
      for (const meal of day.diet) {
        protein += meal.protein;
      }
    }
    if (day.sleep.length > 0) {
      sleep = day.sleep[0].sleepHours;
    }
    //weight to be added
    const weight = 75;
    const sleepIndex = (1 / (1 + Math.pow(10, -sleep + 7))) * 0.125 * 0.5;
    const dietIndex =
      (1 /
        (1 + Math.pow(100, -(protein === 0 ? 1.2 : protein / weight) + 1.2))) *
      0.125 *
      0.5;
    const recovery = -0.25 * 0.75 - sleepIndex - dietIndex;

    for (const side in exertionTotal) {
      for (const muscle in exertionTotal[side]) {
        exertionTotal[side][muscle] = Math.max(
          0,
          exertionTotal[side][muscle] + recovery // add or subtract depending on your recovery sign
        );
      }
    }

    if (day.exercises.length > 0) {
      const muscleGroupExertionValues = {};
      const exercises = day.exercises;
      for (const exercise of exercises) {
        //function returns the array of muscles
        const musclesWorked = await getExerciseInfo(exercise.exerciseDocRef);
        const intensity = exercise.intensity / 10; // normalize once here

        for (const muscle of musclesWorked) {
          if (muscleGroupExertionValues[muscle] === undefined) {
            muscleGroupExertionValues[muscle] = intensity;
          } else {
            muscleGroupExertionValues[muscle] += intensity;
          }
          // Cap at 1
          if (muscleGroupExertionValues[muscle] > 1) {
            muscleGroupExertionValues[muscle] = 1;
          }
        }
      }
      for (const muscle in muscleGroupExertionValues) {
        if (exertionTotal.front[muscle] != undefined) {
          if (exertionTotal.front[muscle] + recovery <= 0) {
            exertionTotal.front[muscle] = 0;
          } else {
            exertionTotal.front[muscle] += recovery;
          }

          exertionTotal.front[muscle] += muscleGroupExertionValues[muscle];
        }
      }
    }
  }
  formatValuesForDisplay(exertionTotal);
  return exertionTotal;
}

export async function updateExertionData(userId, entryData) {
  await logActivityToDatabase(userId, entryData);
  const data = await fetchUserData(userId);
  const values = await calculateExertion(data);
  return values;
}
