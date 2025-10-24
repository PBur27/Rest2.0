
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BatteryIcon from "../../components/BatteryIcon";
import BodyImage from "../../components/body_screen/BodyImage";
import SmallLogo from "../../components/SmallLogo";
import { useUser, useUserData } from "../UserDataContext";
import TopBar from "../../components/TopBar";



export default function HomeScreen() {
  const userId = useUser();
  const exertionValues = useUserData();

  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar element={BatteryIcon}/>
      <View style={[styles.container, {flex:13}]}>
        <BodyImage organism={exertionValues} />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#8C7871",
    color: "#FBF1E6",
  },
  container: {
    flex: 1,
    backgroundColor: "#FBF1E6",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 5,
    backgroundColor: "#FBF1E6",
  },
})