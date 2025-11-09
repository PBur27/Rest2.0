
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseApp";

export async function anonymousLogin() {

  if (!auth) throw new Error("Firebase Auth is not initialized");

  try {
    await signInAnonymously(auth);
  } catch (error) {
    return Promise.reject(new Error(`Anonymous login error: ${error.message}`));
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid
        try {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            await setDoc(userRef, {});
            console.log("User registered:", userId);
          } else {
            console.log("User exists:", userId);
          }

          resolve(userId);
          unsubscribe()
        } catch (error) {
          reject(new Error(`Error checking/creating user: ${error.message}`))
          unsubscribe()
        }
      }
      else {
        reject(new Error("onAuthStateChange - user Error"))
        unsubscribe()
      }
    })
  })
}