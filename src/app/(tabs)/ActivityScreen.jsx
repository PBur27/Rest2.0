import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityDateTime from "../../components/activity_screen/ActivityDateTime";
import ActivityEntries from "../../components/activity_screen/ActivityEntries";
import ActivityPicker from "../../components/activity_screen/ActivityPicker";
import TopBar from "../../components/TopBar";
import { calculateExertion } from "../../firebase/calculateExertion";
import { updateData } from "../../firebase/updateUserData";
import { useSetUserData, useSetUserExertion, useUserData } from "../UserDataContext";

export default function ActivityScreen() {
  const [entry, setEntry] = useState({
    activity: "workout",
    dateTime: new Date(),
    data: [],
  });

  const userData = useUserData();
  const setUserData = useSetUserData();
  const setUserExertion = useSetUserExertion();

  const saveActivity = async () => {
    try {
      const oldDaysData = userData;
      const newDaysData = updateData(entry, oldDaysData);
      const newExertionValues = await calculateExertion(newDaysData);

      setUserData(newDaysData)
      await setUserExertion(newExertionValues)

      setEntry({ activity: "workout", dateTime: new Date(), data: [] });
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  const setEntryActivity = (value) => {
    setEntry((prev) => ({
      ...prev,
      activity: value,
    }));
  };
  const setEntryDateTime = (value) => {
    setEntry((prev) => ({
      ...prev,
      dateTime: value,
    }));
  };
  const setEntryData = (value) => {
    setEntry((prev) => ({
      ...prev,
      // value has to be an array
      data: value,
    }));
  };


  return (
    <SafeAreaView style={styles.backgroundContainer} edges={["top"]}>
      <TopBar display="Add Data" />
      <ActivityPicker activity={entry.activity} setActivity={setEntryActivity} />
      <ActivityDateTime activity={entry.activity} dateTime={entry.dateTime} setDateTime={setEntryDateTime} />
      <View style={[styles.contentContainer, { flex: 11 }]}>
        <ActivityEntries
          activity={entry.activity}
          dateTime={entry.dateTime}
          data={entry.data}
          setData={setEntryData}
          saveActivity={saveActivity}
        ></ActivityEntries>
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
