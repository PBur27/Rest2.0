import { router } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateExertion } from "../firebase/calculateExertion";
import { fetchExercisesData } from "../firebase/fetchExercisesData";
import { fetchUserData } from "../firebase/fetchUserData";
import { anonymousLogin } from "../firebase/loginOrRegister";
import { styles } from "../styles/styles";
import { useSetExercisesData, useSetUid, useSetUserData, useSetUserExertion } from "./UserDataContext";

export default function Index() {
  const setUid = useSetUid();
  const setUserData = useSetUserData();
  const setExertionValues = useSetUserExertion();
  const setExercisesData = useSetExercisesData();

  useEffect(() => {
    async function getUserData() {
      try {
        const userId = await anonymousLogin();
        await loginOrRegister(userId);
        await setUid(userId);
        const userData = await fetchUserData(userId);
        await setUserData(userData)
        const exercisesData = await fetchExercisesData();
        await setExercisesData(exercisesData)
        const exertionValues = calculateExertion(userData,exercisesData);
        await setExertionValues(exertionValues);
        router.replace({ pathname: "/(tabs)/HomeScreen" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container_center}>
      <Image
        style={styles.logo_large}
        source={require("../assets/images/logo.png")}
      />
    </SafeAreaView>
  );
}
