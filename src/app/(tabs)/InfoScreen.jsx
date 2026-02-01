import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar";
import { useUser } from "../UserDataContext";

export default function InfoScreen() {
  const userId = useUser();
  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display="Info" />
      <View style={[styles.container, { flex: 13 }]}>
        {
          {
            /*

          INFO SCREEN
          - display user's data and settings
          - stats over time from the last 7? days
          - goal completion levels
          - python generated data visualizations?
          */
          }
        }
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
