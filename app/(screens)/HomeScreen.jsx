import React from "react";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          backgroundColor: "dimgray",
          flex: 1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "offwhite",
          flex: 8,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "green",
          flex: 1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "dimgray",
          flex: 2,
        }}
      ></View>
    </View>
  );
};

