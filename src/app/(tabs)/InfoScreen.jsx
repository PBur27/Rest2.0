import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateCalories } from "../../components/info_screen/calculateCalories";
import { calculateProtein } from "../../components/info_screen/calculateProtein";
import TopBar from "../../components/TopBar";
import { useUserData } from "../UserDataContext";

export default function InfoScreen() {
  const userData = useUserData();
  const calorieIntakeArray = calculateCalories(userData);
  const proteinIntakeArray = calculateProtein(userData);
  // arrays of seven values each representing the sum of calories/protein for each day in the last week, ordered chronologically from oldest to most recent
  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display={"Info"} />
      <View style={[styles.container, { flex: 13 }]}>
        {/*INFO SCREEN
          - display user's data and settings
          - stats over time from the last 7? days
          - goal completion levels
          - RECHARTS? or other js plot generator*/}

        <Button title="show user data" onPress={() => console.log(userData)} />
        <Button
          title="calculate calories and protein"
          onPress={() =>
            console.log("c: ", calorieIntakeArray, "p: ", proteinIntakeArray)
          }
        />
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
