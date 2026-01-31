import { doc } from "firebase/firestore";
import { db } from "./firebaseApp";

export function updateData(entry, days) {
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  for (const day of days) {
    if (!isSameDay(day.date, entry.dateTime)) continue;

    if (entry.activity === "exercises") {
      for (const ex of entry.data)
        day.exercises.push({
          exerciseDocRef: doc(db, "exercises", ex.name),
          intensity: ex.intensity,
        });
    } else if (entry.activity === "sleep") {
      for (const s of entry.data)
        day.sleep.push({
          bedtime: s.bedtime,
          sleepHours: s.sleepHours,
        });
    } else if (entry.activity === "diet") {
      for (const d of entry.data)
        day.diet.push({
          calories: d.calories,
          protein: d.protein,
        });
    }
  }

  return days;
}
