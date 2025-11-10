import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseApp";

export async function fetchExercisesData() {
    const exercises = {}
    const exercisesQuerySnapshot = await getDocs(collection(db, "exercises"))
    exercisesQuerySnapshot.forEach(doc => {
        exercises[doc.id] = doc.data().muscles;
    });

    return exercises

}