import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateExertion } from "../firebase/calculateExertion";
import { fetchExercisesData } from "../firebase/fetchExercisesData";
import { fetchUserData } from "../firebase/fetchUserData";
import { anonymousLogin } from "../firebase/loginOrRegister";
import { styles } from "../styles/styles";
import {
  useSetExercisesData,
  useSetUid,
  useSetUserDataDaysContext,
  useSetUserExertionContext,
} from "./UserDataContext";

export default function Index() {
  const params = useLocalSearchParams();
  const debugId = params?.debugId;
  const setUid = useSetUid();
  const setUserData = useSetUserDataDaysContext();
  const setExertionValues = useSetUserExertionContext();
  const setExercisesData = useSetExercisesData();

  useEffect(() => {
    async function getUserData() {
      try {
        let userId;

        if (debugId != undefined) {
          console.warn("ENTERING DEBUG MODE ", debugId);
          userId = debugId;
          setUid(userId);
        } else {
          userId = await anonymousLogin();
          setUid(userId);
          console.log("User Id: ", userId);
        }
        const userData = await fetchUserData(userId);
        setUserData(userData);
        const exercisesData = await fetchExercisesData();
        setExercisesData(exercisesData);
        const exertionValues = await calculateExertion(userData, exercisesData);
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
