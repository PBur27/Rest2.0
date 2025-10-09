import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityDateTime from '../../components/activity_screen/ActivityDateTime';
import ActivityEntries from '../../components/activity_screen/ActivityEntries';
import ActivityPicker from '../../components/activity_screen/ActivityPicker';
import CustomText from '../../components/CustomText';
import SmallLogo from '../../components/SmallLogo';
import { styles } from "../../styles/styles";


export default function ActivityScreen() {

  const [activity, setActivity] = useState("workout");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    console.log(newTime);
  };

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
            <ActivityDateTime onChangeDate={handleDateChange} onChangeTime={handleTimeChange} />
          </View>
          <View style={{ flex: 5 }}>
            <ActivityEntries activity={activity} date={date} time={time} >

            </ActivityEntries>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}