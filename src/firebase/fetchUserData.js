import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchUserData(userId) {
  const userDataDaysRef = collection(db, "users", userId, "days");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const snap = await getDocs(
    query(userDataDaysRef, where("date", ">=", sevenDaysAgo)),
  );
  const userDaysDocs = snap.docs;

  //function creating empty dataDays for the last 7 days
  const generateDataDays = () => {
    const dataDaysObj = {};

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i,
      );

      const dateKey = dateObj.toLocaleDateString("en-CA");
      dataDaysObj[dateKey] = {
        date: dateObj,
        exercises: [],
        sleep: [],
        diet: [],
      };
    }

    return dataDaysObj;
  };
  const dataDaysObj = generateDataDays();

  //populating dataDays with user data
  if (userDaysDocs) {
    userDaysDocs.forEach((doc) => {
      const docData = doc.data();
      const docDate = docData.date.toDate().toLocaleDateString("en-CA");

      if (dataDaysObj[docDate]) {
        // Direct assignment - O(1) speed
        if (docData.workout) dataDays[docDate].exercises = docData.workout;
        if (docData.sleep) dataDays[docDate].sleep = docData.sleep;
        if (docData.diet) dataDays[docDate].diet = docData.diet;
      }
    });
  } else {
    console.log("fetchUserData - no data found");
  }
  const finalArray = Object.values(dataDaysObj).sort((a, b) => {
    return b.date.getTime() - a.date.getTime(); // Sort Newest -> Oldest
  });

  console.log("Fetched user data days:", finalArray);
  return finalArray;
}
