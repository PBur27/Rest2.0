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
  //load date if user was redirected here from history screen
  const params = useLocalSearchParams();
  const initialDateLocaleString = params.date;
  const initialActivity = params.activityType;
  //context data setters
  const setUserData = useSetUserData();
  const setUserExertion = useSetUserExertion();
  //userData from context
  const dataDays = useUserData();
  const exercisesData = useExercisesData();
  const userId = useUser();

  //helper function to find day by date
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  //helper function to return day data by date
  const returnDayByDate = (date) => {
    for (const day of dataDays) {
      if (isSameDay(day.date, date)) {
        return day;
      }
    }
    console.log("ActivityScreen: no day found");
    return null;
  };

  const [date, setDate] = useState(
    initialDateLocaleString ? new Date(initialDateLocaleString) : new Date(),
  );
  const [activity, setActivity] = useState(
    initialActivity ? initialActivity : "exercises",
  );
  //find data from correct day and activity
  const [data, setData] = useState([]);

  useEffect(() => {
    const day = returnDayByDate(date);
    setData(day?.[activity] ?? []);
  }, [date, activity]);

  console.log(
    "ActivityScreen: loading data:",
    returnDayByDate(date)?.[activity],
    "for date:",
    date,
    "actual data:",
    data,
  );

  useEffect(() => {
    if (params.date) {
      setDate(new Date(params.date));
    }
    if (params.activityType) {
      setActivity(params.activityType);
    }
  }, [params.date, params.activityType]);
  

  const saveActivity = async () => {
    const newDataDays = structuredClone(dataDays);

    const mergeById = (existing = [], incoming = []) => {
      const ids = new Set(existing.map((item) => item.id));
      return [...existing, ...incoming.filter((item) => !ids.has(item.id))];
    };

    for (const day of newDataDays) {
      if (!isSameDay(day.date, date)) continue;

      if (activity === "exercises") {
        day.exercises = mergeById(day.exercises, data);
      } else if (activity === "diet") {
        day.diet = mergeById(day.diet, data);
      } else if (activity === "sleep") {
        day.sleep = mergeById(day.sleep, data);
      }
    }

    const newExertion = calculateExertion(newDataDays, exercisesData);

    setUserData(newDataDays);
    setUserExertion(newExertion);
    await logUserData(userId, date, activity, data);
  };

  useEffect(() => {
    saveActivity();
  },[data])


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
