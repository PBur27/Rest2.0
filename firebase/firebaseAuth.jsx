import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

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
