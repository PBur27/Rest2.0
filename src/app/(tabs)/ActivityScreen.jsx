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
  useSetUserDataDaysContext,
  useSetUserExertionContext,
  useUser,
  useUserDataDaysContext,
} from "../UserDataContext";

export default function ActivityScreen() {
  //load date if user was redirected here from history screen
  const params = useLocalSearchParams();
  const initialDateLocaleString = params.date;
  const initialActivity = params.activityType;
  //context data setters
  const setUserDataDaysContext = useSetUserDataDaysContext();
  const setUserExertionContext = useSetUserExertionContext();
  //userData from context
  const dataDays = useUserDataDaysContext();
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

  //date is set from params if they exist (History Screen), default is now
  const [date, setDate] = useState(
    initialDateLocaleString
      ? new Date(initialDateLocaleString)
      : new Date(new Date().setHours(0, 0, 0, 0)),
  );

  //activity is set from params if they exist (History Screen), default is exercises
  const [activity, setActivity] = useState(
    initialActivity ? initialActivity : "exercises",
  );
  //data is set based on activity and date, default is empty array
  const [data, setData] = useState(() => {
    const day = returnDayByDate(date);
    return day?.[activity] ?? [];
  });

  useEffect(() => {
    const day = returnDayByDate(date);
    setData(day?.[activity] ?? []);
  }, [date, activity]);
  /*
  console.log(
    "ActivityScreen: loading data:",
    returnDayByDate(date)?.[activity],
    "for date:",
    date,
  );
*/
  useEffect(() => {
    if (params.date) {
      setDate(new Date(params.date));
    }
    if (params.activityType) {
      setActivity(params.activityType);
    }
  }, [params.date, params.activityType]);

  const saveActivity = async (data, activity, date) => {
    const newDataDays = structuredClone(dataDays);

    const dataDaysChecker = (daysArray) => {
      for (const dayObject of daysArray) {
        console.log(dayObject);
      }
    };

    /*
    console.log("oldDataDays");
    dataDaysChecker(newDataDays);
    console.log("replacement:", data, date, activity);
    */

    for (const day of newDataDays) {
      if (isSameDay(day.date, date)) {
        day[activity] = data;
        console.log("found matching day, replacing data with: ", day);
        break;
      }
    }

    /*
    console.log("newDataDays");
    dataDaysChecker(newDataDays);
    */
    const newExertion = await calculateExertion(newDataDays, exercisesData);

    setUserDataDaysContext(newDataDays);
    setUserExertionContext(newExertion);
    logUserData(userId, date, activity, data);
  };

  useEffect(() => {
    saveActivity(data, activity, date);
  }, [data]);

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
