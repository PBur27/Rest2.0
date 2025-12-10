import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function logUserData(userId, dataDays) {
  const userRef = collection(db, "users", userId);

  if (dataDays.length === 0) {
    console.warn("Error adding data to db: no data");
    return;
  }

  
  

  addDoc();
}
