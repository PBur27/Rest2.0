import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react';
import CustomText from './CustomText'

export default function ActivityPicker({ activity, setActivity }) {
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={activity === "meal" ? styles.button_active : styles.button} onPress={() => setActivity("meal")}>
        <CustomText style={{ fontSize: 24, color: "#FBF1E6", backgroundColor: "transparent" }} >Meal</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={activity === "workout" ? styles.button_active : styles.button} onPress={() => setActivity("workout")}>
        <CustomText style={{ fontSize: 24, color: "#FBF1E6", backgroundColor: "transparent" }}>Workout</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={activity === "sleep" ? styles.button_active : styles.button} onPress={() => setActivity("sleep")}>
        <CustomText style={{ fontSize: 24, color: "#FBF1E6", backgroundColor: "transparent" }}>Sleep</CustomText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 20,
    backgroundColor: "#8C7871",
    borderRadius: 10,
  },
  button_active: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 20,
    backgroundColor: "#8C7871",
    borderRadius: 10,
    backgroundColor: "#5B4B45",
  }
})

