import { styles } from "../styles/styles";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { anonymousLogin } from "../../firebase/firebaseAuth";

export default function Index() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    async function login() {
      try {
        const userId = await anonymousLogin();
        setUid(userId);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
    login();
  }, []);

  useEffect(() => {
    if (uid){
         console.log(uid);
    }
  }, [uid]);

  return (
    <SafeAreaView style={styles.container_center}>
      <Image
        style={styles.logo_large}
        source={require("../../assets/images/logo.png")}
      />
    </SafeAreaView>
  );
}
