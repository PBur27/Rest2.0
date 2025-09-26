import React from "react";
import { View, Text } from "react-native";
import { useUser } from "../AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";

export default function HomeScreen() {
  const userId = useUser();
  console.log("User ID:", userId);
  return (
    <SafeAreaView style={ styles.container_secondary }>
      <View style={styles.container_center}>
        <Text>Welcome to the Home Screen!</Text>
        <Text>Your User ID is: {userId}</Text>
      </View>
    </SafeAreaView>
  );
};

