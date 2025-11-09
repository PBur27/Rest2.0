import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS !== "web") {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = initializeAuth(app);
}

export const db = getFirestore(app);
export { auth };
