
import { router } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleRedirect = () => {
    router.push("/test");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={require('../../assets/images/logo.png')}/>
    </SafeAreaView>
  );
}
