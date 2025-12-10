import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function logUserData(userId, date, activity, data) {
  if (!data || data.length === 0) {
    console.warn("Error adding data to db: no data to add");
    return;
  }

  //date,activity,data
  const docRef = doc(db, "users", userId, "days", date);

  await setDoc(
    docRef,
    {
      date,
      [activity]: [...data],  
    },
    { merge: true }
  );
}
