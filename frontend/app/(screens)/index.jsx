import { styles } from "../styles/styles";
import { router } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleRedirect = () => {
    router.push("/test");
  };

  return (
    <SafeAreaView style={styles.container_center}>
      <Image style={styles.logo_large} source={require('../../assets/images/logo.png')}/>
    </SafeAreaView>
  );
}
