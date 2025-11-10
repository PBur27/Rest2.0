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
        setUid(userId);
        const userData = await fetchUserData(userId);
        setUserData(userData)
        const exercisesData = await fetchExercisesData();
        setExercisesData(exercisesData)
        const exertionValues = calculateExertion(userData,exercisesData);
        setExertionValues(exertionValues);
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
