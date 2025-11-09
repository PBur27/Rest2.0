import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchUserData(userId) {
  const workoutRef = collection(db, "users", userId, "workout");
  const sleepRef = collection(db, "users", userId, "sleep");
  const dietRef = collection(db, "users", userId, "diet");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const [workoutDocs, sleepDocs, dietDocs] = await Promise.all([
    getDocs(query(workoutRef, where("date", ">=", sevenDaysAgo))),
    getDocs(query(sleepRef, where("date", ">=", sevenDaysAgo))),
    getDocs(query(dietRef, where("date", ">=", sevenDaysAgo))),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i),
    exercises: [],
    sleep: [],
    diet: [],
  }));

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const addDocsToDays = (docs, key) => {
    docs.forEach((doc) => {
      const data = doc.data();
      const docDate = data.date.toDate ? data.date.toDate() : data.date;
      days.forEach((day) => {
        if (isSameDay(day.date, docDate)) day[key].push(...data.data);
      });
    });
  };

  addDocsToDays(workoutDocs.docs, "exercises");
  addDocsToDays(sleepDocs.docs, "sleep");
  addDocsToDays(dietDocs.docs, "diet");

  return days;
}
