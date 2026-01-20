import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityDateTime from "../../components/activity_screen/ActivityDateTime";
import ActivityEntries from "../../components/activity_screen/ActivityEntries";
import ActivityPicker from "../../components/activity_screen/ActivityPicker";
import TopBar from "../../components/TopBar";
import { calculateExertion } from "../../firebase/calculateExertion";
import { logUserData } from "../../firebase/logUserData";
import {
  useExercisesData,
  useSetUserData,
  useSetUserExertion,
  useUser,
  useUserData,
} from "../UserDataContext";

export default function ActivityScreen() {
  //load data if user was redirected here from history screen
  const params = useLocalSearchParams();
  const editMode = params.editMode;
  const editedActivityType = params.activityType;
  const editedActivityDate = params.date;
  //context data setters
  const setUserData = useSetUserData();
  const setUserExertion = useSetUserExertion();
  //userData from context
  const dataDays = useUserData();
  const exercisesData = useExercisesData();
  const userId = useUser();

  const [date, setDate] = useState(new Date());
  const [activity, setActivity] = useState("workout");
  const [data, setData] = useState([]);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // update state if in edit mode
  useEffect(() => {
    const findDayData = (days, date, type) => {
      for (const day of days) {
        if (isSameDay(day.date, date)) {
          return day[type];
        }
      }
    };

    if (editMode === "true") {
      console.log(
        "Editing ",
        editedActivityType,
        " data for ",
        editedActivityDate,
      );
      setDate(new Date(editedActivityDate));
      setActivity(editedActivityType);

      if (editedActivityType === "workout") {
        const dayData = findDayData(
          dataDays,
          new Date(editedActivityDate),
          "exercises",
        );
        console.log(dayData);
        setData(dayData);
      } else if (editedActivityType === "diet") {
        const dayData = findDayData(
          dataDays,
          new Date(editedActivityDate),
          "diet",
        );
        setData(dayData);
        console.log(dayData);
      } else if (editedActivityType === "sleep") {
        const dayData = findDayData(
          dataDays,
          new Date(editedActivityDate),
          "sleep",
        );
        const normalized = dayData.map((d) => ({
          ...d,
          bedtime: d.bedtime.toDate(),
        }));

        setData(normalized);
      }
    }
  }, []);

  const saveActivity = async () => {
    //clone state to avoid state variable mutation
    const newDataDays = structuredClone(dataDays);

    //add data to selected day
    for (const day of newDataDays) {
      if (isSameDay(day.date, date)) {
        if (activity == "workout") {
          day.exercises.push(...data);
        } else if (activity == "diet") {
          day.diet.push(...data);
        }
        if (activity == "sleep") {
          day.sleep.push(...data);
        }
      }
    }

    // overlay would be good while these 3 are running
    const newExertion = calculateExertion(newDataDays, exercisesData);
    setUserData(newDataDays);
    setUserExertion(newExertion);
    logUserData(userId, date, activity, data);
    setData([]); //clear data after saving
  };

  return (
    <SafeAreaView style={styles.backgroundContainer} edges={["top"]}>
      <TopBar display="Add Data" />
      <View style={{ flex: 13, backgroundColor: "#FBF1E6" }}>
        <ActivityPicker
          activity={activity}
          setActivity={setActivity}
          setData={setData}
        />
        <ActivityDateTime activity={activity} date={date} setDate={setDate} />
        <View style={[styles.contentContainer, { flex: 11 }]}>
          <ActivityEntries
            activity={activity}
            data={data}
            setData={setData}
            saveActivity={saveActivity}
          ></ActivityEntries>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#8C7871",
  },
  contentContainer: {
    backgroundColor: "#FBF1E6",
    color: "#8C7871",
  },
});
