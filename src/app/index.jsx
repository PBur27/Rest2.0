import { router } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  anonymousLogin,
  calculateExertion,
  fetchUserData,
  loginOrRegister,
} from "../firebase/firebase";
import { styles } from "../styles/styles";
import { useSetUid, useSetUserData } from "./UserDataContext";

export default function Index() {
  const setUid = useSetUid();
  const setExertionValues = useSetUserData();

  useEffect(() => {
    async function getUserId() {
      try {
        const userId = await anonymousLogin();
        await loginOrRegister(userId);
        await setUid(userId);
        const data = await fetchUserData(userId);
        const exertionValues = await calculateExertion(data);
        await setExertionValues(exertionValues);
        router.replace({ pathname: "/(tabs)/HomeScreen" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
    getUserId();
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
