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

export async function logActivityToDatabase(userId, entry) {
  //choose collection based on entry
  const activityRef = collection(db, "users", userId, entry.activity);
  if (entry.activity === "workout" && entry.data.length > 0) {
    const exercises = [];
    for (const exercise of entry.data) {
      //create reference to execrices collection
      const exerciseDocRef = doc(db, "exercises", exercise["name"]);
      exercises.push({
        exerciseDocRef,
        intensity: exercise["intensity"],
      });
    }
    addDoc(activityRef, {
      date: entry.dateTime,
      data: exercises,
    });
  } else if (entry.activity === "diet" && entry.data.length > 0) {
    const diet = [];
    for (const meal of entry.data) {
      diet.push({
        calories: meal.calories,
        protein: meal.protein,
      });
    }
    addDoc(activityRef, {
      date: entry.dateTime,
      data: diet,
    });
  } else if (entry.activity === "sleep" && entry.data.length > 0) {
    const sleep = [];
    for (const nap of entry.data) {
      sleep.push({
        bedtime: nap.bedtime,
        sleepHours: nap.sleepHours,
      });
    }
    addDoc(activityRef, {
      date: entry.dateTime,
      data: sleep,
    });
  } else {
    console.log("Error adding activity to db");
  }
}

export async function fetchUserData(userId) {
  const workoutRef = collection(db, "users", userId, "workout");
  const sleepRef = collection(db, "users", userId, "sleep");
  const dietRef = collection(db, "users", userId, "diet");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  // Fetch data from the last 7 days
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

  // same date check
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Distribute each document into its corresponding day
  const addDocsToDays = (docs, key) => {
    docs.forEach((doc) => {
      const data = doc.data();
      const docDate = data.date.toDate ? data.date.toDate() : data.date;


      days.forEach((day) => {
        if (isSameDay(day.date, docDate)) {
          day[key].push(...data.data);
        }
      });
    });
  };

  addDocsToDays(workoutDocs.docs, "exercises");
  addDocsToDays(sleepDocs.docs, "sleep");
  addDocsToDays(dietDocs.docs, "diet");

  return days;
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

  async function getExerciseInfo(ref) {
    const exercise = await getDoc(ref);

    if (exercise.exists()) {
      return exercise.data().muscles;
    } else {
      console.warn("No such document!");
    }
  }

  days.sort((a, b) => a.date - b.date);
  for (const day of days) {
    let protein = 0;
    let sleep = 7;
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
    const sleepIndex = (1 / (1 + Math.pow(10, -sleep + 7))) * 0.125;
    const dietIndex = (1 / (1 + Math.pow(100, -(protein === 0 ? 1.2 : protein / weight) + 1.6))) * 0.125;
    const recovery = -0.25 * 0.75 - sleepIndex - dietIndex;



    for (const side in exertionTotal) {
      for (const muscle in exertionTotal[side]) {
        exertionTotal[side][muscle] = Math.max(
          0,
          exertionTotal[side][muscle] + recovery
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
    //console.log(day.date, "recovery", recovery, "sleepindex", sleepIndex, "dietindex", dietIndex, exertionTotal)

  }
  formatValuesForDisplay(exertionTotal);
  return exertionTotal;
}

export function updateData(entry, days) {
  // same date check
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  for (const day of days) {
    if (isSameDay(day.date, entry.dateTime)) {
      
      if (entry.activity == "workout") {
        if (entry.data.length > 0) {
          for (const element of entry.data) {
            const exerciseDocRef = doc(db, "exercises", element["name"]);
            day.exercises.push({ exerciseDocRef, intensity: element["intensity"] })
          }
        }
        else {
          console.warn("error updating data: empty exercise entry error")
        }
      }
      else if (entry.activity == "sleep") {
        if (entry.data.length > 0) {
          for (const element of entry.data) {
            day.sleep.push({ bedtime: element["bedtime"], sleepHours: element["sleepHours"] })
          }
        }
        else {
          console.warn("error updating data: empty sleep entry error")
        }
      }
      else if (entry.activity == "diet") {
        if (entry.data.length > 0) {
          for (const element of entry.data) {
            day.diet.push({ calories: element["calories"], protein: element["protein"] })
          }
        }
        else {
          console.warn("error updating data: empty diet entry error")
        }
      }
    }
  }

  return days
}
