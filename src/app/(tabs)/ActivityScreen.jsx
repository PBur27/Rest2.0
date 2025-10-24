import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityDateTime from "../../components/activity_screen/ActivityDateTime";
import ActivityEntries from "../../components/activity_screen/ActivityEntries";
import ActivityPicker from "../../components/activity_screen/ActivityPicker";
import TopBar from "../../components/TopBar";
import { updateExertionData } from "../../firebase/firebase";
import { useSetUserData, useUser } from "../UserDataContext";

export default function ActivityScreen() {
  const [entry, setEntry] = useState({
    activity: "workout",
    dateTime: new Date(),
    data: [],
  });
  const userId = useUser();
  const setExertionValues = useSetUserData();

  const saveActivity = async () => {
    try {
      const newData = await updateExertionData(userId, entryData);
      await setExertionValues(newData);
      setEntry({ activity: activity, dateTime: dateTime, data: [] });
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
      <TopBar rightElement="Add Data" />
      <ActivityPicker activity={entry.activity} setActivity={setEntryActivity} />
      <View style={[styles.contentContainer,{ flex: 11 }]}>
        <ActivityDateTime activity={entry.activity} dateTime={entry.dateTime} setDateTime={setEntryDateTime} />
        <ActivityEntries
          activity={entry.activity}
          dateTime={entry.dateTime}
          data = {entry.data}
          setData={setEntryData}
        ></ActivityEntries>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#FBF1E6",
  },
  contentContainer: {
    backgroundColor: "#FBF1E6",
    color: "#8C7871",
  },
});
