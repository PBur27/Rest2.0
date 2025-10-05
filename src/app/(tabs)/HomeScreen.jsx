import React from "react";
import { Link } from "expo-router";
import { View, Text, Button, Image } from "react-native";
import { useUser } from "../AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/styles";
import CustomText from "../../components/CustomText";
import BodyImage from "../../components/BodyImage";
import BatteryIcon from "../../components/BatteryIcon";
import SmallLogo from "../../components/SmallLogo";



export default function HomeScreen() {
  const userId = useUser();
  console.log("User ID:", userId);
  return (
    <SafeAreaView style={styles.container_secondary} edges={["top"]}>
      <View style={styles.top_bar}>
        <SmallLogo />
        <BatteryIcon />
      </View>
      <CustomText>
        Font
      </CustomText>
      <View style={[styles.container_center, styles.middle_container]}>
        <BodyImage />
      </View>
    </SafeAreaView>
  );
};

