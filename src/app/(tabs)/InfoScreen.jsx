import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/CustomText";
import { calculateCalories } from "../../components/info_screen/calculateCalories";
import { calculateProtein } from "../../components/info_screen/calculateProtein";
import UserDataChart from "../../components/info_screen/UserDataChart";
import TopBar from "../../components/TopBar";
import { useUserDataDaysContext } from "../UserDataContext";

export default function InfoScreen() {
  const userData = useUserDataDaysContext();
  const calorieIntakeArray = calculateCalories(userData);
  const proteinIntakeArray = calculateProtein(userData);
  // arrays of seven values each representing the sum of calories/protein for each day in the last week, ordered chronologically from oldest to most recent

  //extract days from userData
  const daysArray = userData.map((day) => {
    const d = day.date.getDate().toString().padStart(2, "0");
    const m = (day.date.getMonth() + 1).toString().padStart(2, "0");

    return `${d}.${m}`;
  });

  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display={"Info"} />
      <CustomText style={styles.topText}>
        Portfolio version of the app - user stats and goals are preset
      </CustomText>
      <View style={[styles.container, { flex: 12 }]}>
        {/*INFO SCREEN
          - display user's data and settings
          - stats over time from the last 7? days
          - goal completion levels
          - RECHARTS? or other js plot generator*/}
        <View style={styles.chartContainer}>
          <CustomText>Calorie Intake</CustomText>
          <UserDataChart
            userData={calorieIntakeArray}
            days={daysArray}
            fill={"blue"}
          />
        </View>
        <View style={styles.chartContainer}>
          <CustomText>Protein Intake</CustomText>
          <UserDataChart
            userData={proteinIntakeArray}
            days={daysArray}
            fill={"red"}
          />
        </View>

        <Button title="show user data" onPress={() => console.log(daysArray)} />
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
  topText: {
    flex: 1,
    backgroundColor: "#FBF1E6",
  },
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FBF1E6",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chartContainer: {
    flex: 1,
    marginBottom: 20,
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
