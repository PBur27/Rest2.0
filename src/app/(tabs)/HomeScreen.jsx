import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BodyImage from "../../components/body_screen/BodyImage";
import TopBar from "../../components/TopBar";
import { useUserExertionContext } from "../UserDataContext";

export default function HomeScreen() {
  const exertionValues = useUserExertionContext();
  const [displayValues, setDisplayValues] = useState(exertionValues);

  //console.log(displayValues);

  useEffect(() => {
    setDisplayValues(exertionValues);
  }, [exertionValues]);

  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display="battery" />
      <View style={[styles.container, { flex: 13 }]}>
        <BodyImage organism={displayValues} />
      </View>
    </SafeAreaView>
  );
}

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
});
