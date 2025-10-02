import { router } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { anonymousLogin } from "../firebase/firebaseAuth";
import { useSetUid } from "./AuthContext";
import { styles } from "../styles/styles";

export default function Index() {
  const setUid = useSetUid();

  useEffect(() => {
    async function getUserId() {
      try {
        const userId = await anonymousLogin();
        await setUid(userId);
        router.replace("/(screens)/HomeScreen");
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
