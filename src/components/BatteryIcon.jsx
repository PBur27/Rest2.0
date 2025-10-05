import { StyleSheet, Image } from 'react-native';
import React from 'react';

export default function BatteryIcon() {
  return (
    <Image
      source={require("../assets/images/battery_full.png")}
      style={styles.icon} 
    />
  );
}

const styles = StyleSheet.create({
  icon: {  
    width: 100,
    maxHeight: "90%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});
