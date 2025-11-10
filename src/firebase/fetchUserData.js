import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchUserData(userId) {
  const userDataDays = collection(db, "users", userId, "days");

  const today = new Date();
  const sevenDaysAgo = today.setDate(sevenDaysAgo.getDate() - 7);

  const dataFromLastSevenDays = await getDocs(query(userDataDays, where('date', ">=", sevenDaysAgo)))


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
