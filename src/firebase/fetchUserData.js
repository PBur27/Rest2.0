import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchUserData(userId) {
  const userDataDaysRef = collection(db, "users", userId, "days");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);


  const snap = await getDocs(query(userDataDaysRef, where('date', ">=", sevenDaysAgo)))
  const userDaysDocs = snap.docs
  


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
      const docData = doc.data();
      const docDate = docData.date.toDate();
      dataDays.forEach((day) => {
        if (isSameDay(day.date, docDate)) {
          if (docData.workout) {
            console.log(docData.workout)
            day.exercises = docData.workout
          }
          if (docData.sleep) {
            console.log(docData.sleep)
            day.sleep = docData.sleep
          }
          if (docData.diet) {
            console.log(docData.diet)
            day.diet = docData.diet
          }
        }
      });
    });
  }
  else {
    console.log("fetchUserData - no data found")
  }
  console.log("Fetched user data days:", dataDays);
  return dataDays;
}
