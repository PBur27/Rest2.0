import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from "../../styles/styles";
import { useUser } from '../AuthContext'
import ActivityPicker from '../../components/ActivityPicker';
import CustomText from '../../components/CustomText'
import SmallLogo from '../../components/SmallLogo';


export default function ActivityScreen() {
  const userId = useUser();
  console.log("User ID:", userId);

  const [activity, setActivity] = useState("workout");

  return (
    <SafeAreaView style={styles.container_secondary} edges={["top"]}>
      <View style={styles.top_bar}>
        <SmallLogo />
        <CustomText >Activity</CustomText>
      </View>
      <View style={[styles.container, styles.middle_container]}>
        <View style={{ flex: 1}}>
          <ActivityPicker activity={activity} setActivity={setActivity} />
        </View>
        <View style={{ flex: 4}}>
          
        </View>
      </View>
    </SafeAreaView>
  );
}