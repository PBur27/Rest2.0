import React from "react";
import { Link } from "expo-router";
import { View, Text, Button, Image } from "react-native";
import { CustomText } from "../../components/CustomText";
import { useUser } from "../AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/styles";
import BodyImage from "../../components/BodyImage";


export default function HomeScreen() {
  const userId = useUser();
  console.log("User ID:", userId);
  return (
    <SafeAreaView style={styles.container_secondary} edges={["top"]}>
      <View style={styles.top_bar}>
        <Image
          style={styles.logo_small}
          source={require("../../assets/images/logo.png")}
        />
        <Image
          style={styles.battery_icon}
          source={require("../../assets/images/battery_full.png")}
        />

      </View>
      <CustomText>
        Font
      </CustomText>
      <View style={[styles.container_center, styles.body_container]}>
        <BodyImage />
      </View>
    </SafeAreaView>
  );
};

