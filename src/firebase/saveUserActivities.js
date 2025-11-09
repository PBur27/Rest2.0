import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function logActivityToDatabase(userId, entry) {
  const activityRef = collection(db, "users", userId, entry.activity);

  if (entry.data.length === 0) {
    console.warn("Error adding activity to db: empty entry");
    return;
  }

  const payload = entry.data.map((item) => {
    if (entry.activity === "workout") {
      return {
        exerciseDocRef: doc(db, "exercises", item.name),
        intensity: item.intensity,
      };
    }
    if (entry.activity === "diet") {
      return { calories: item.calories, protein: item.protein };
    }
    if (entry.activity === "sleep") {
      return { bedtime: item.bedtime, sleepHours: item.sleepHours };
    }
  });

  await addDoc(activityRef, { date: entry.dateTime, data: payload });
}
