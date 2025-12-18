import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function logUserData(userId, date, activity, data) {
  if (!data || data.length === 0) {
    console.warn("Error adding data to db: no data to add");
    return;
  }
  const strDate = date.toISOString()
  console.log(userId,date,activity,data)
  //date,activity,data
  const docRef = doc(db, "users", userId, "days", strDate);

  await setDoc(
    docRef,
    {
      date: date,
      [activity]: [...data],  
    },
    { merge: true }
  );
}
