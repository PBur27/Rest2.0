import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchUserData(userId) {
  const userDataDaysRef = collection(db, "users", userId, "days");

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);


  const userDaysDocs = await getDocs(query(userDataDaysRef, where('date', ">=", sevenDaysAgo))).docs


  const dataDays = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i),
    exercises: [],
    sleep: [],
    diet: [],
  }));

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();


  if (userDaysDocs) {
    userDaysDocs.forEach((doc) => {
      const data = doc.data();
      const docDate = data.date.toDate ? data.date.toDate() : data.date;
      dataDays.forEach((day) => {
        if (isSameDay(day.date, docDate)) {
          if (data.exercises) {
            day.exercises = data.exercises
          }
          if (data.sleep) {
            day.sleep = data.sleep
          }
          if (data.diet) {
            day.diet = data.diet
          }
        }
      });
    });
  }
  else {
    console.log("fetchUserData - no data found")
  }




  return dataDays;
}
