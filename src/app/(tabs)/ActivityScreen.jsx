import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityDateTime from '../../components/activity_screen/ActivityDateTime';
import ActivityEntries from '../../components/activity_screen/ActivityEntries';
import ActivityPicker from '../../components/activity_screen/ActivityPicker';
import CustomText from '../../components/CustomText';
import SmallLogo from '../../components/SmallLogo';
import { calculateExertion, fetchUserData, logActivityToDatabase } from '../../firebase/firebase';
import { styles } from "../../styles/styles";
import { useSetUserData, useUser } from '../UserDataContext';


export default function ActivityScreen() {

  const [activity, setActivity] = useState("workout");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [entryData, setEntryData] = useState({activity: activity, data: []});
  const  userId = useUser()
  const setExertionValues = useSetUserData();

  const saveActivity = () => {
    logActivityToDatabase(userId,entryData)
    const updatedData = fetchUserData(userId)
    const newExertionValues = calculateExertion(updatedData)
    setExertionValues(newExertionValues)
    setEntryData({activity: activity, data: []})
  }

  useEffect(() => {
    setEntryData({activity: activity, data: []});
  }, [activity]);
  return (
    <SafeAreaView style={styles.container_secondary} edges={["top"]}>
      <View style={styles.top_bar}>
        <SmallLogo />
        <CustomText >Add Data</CustomText>
      </View>
      <View style={[styles.container, styles.middle_container]}>
        <View style={{ flex: 1 }}>
          <ActivityPicker activity={activity} setActivity={setActivity} />
        </View>
        <View style={{ flex: 6 }}>
          <View style={{ flex: 1 }}>
            <ActivityDateTime activity={entryData.activity} date={date} time={time} setDate={setDate} setTime={setTime} />
          </View>
          <View style={{ flex: 5 }}>
            <ActivityEntries activity={activity} entryData={entryData} setEntryData={setEntryData} saveActivity={saveActivity}>

            </ActivityEntries>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}