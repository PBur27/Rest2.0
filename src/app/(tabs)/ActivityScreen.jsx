import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from "../../styles/styles";
import { useUser } from '../AuthContext'
import ActivityPicker from '../../components/ActivityPicker';
import CustomText from '../../components/CustomText'
import SmallLogo from '../../components/SmallLogo';
import ActivityDateTime from '../../components/ActivityDateTime';
import ActivityEntries from '../../components/ActivityEntries';


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
            <ActivityEntries>

            </ActivityEntries>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}