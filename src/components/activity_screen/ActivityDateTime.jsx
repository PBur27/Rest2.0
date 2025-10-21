import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";

export default function ActivityDateTime({
  activity,
  date,
  time,
  setDate,
  setTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  let isTimeDisabled = false;
  if (activity == "sleep") {
    isTimeDisabled = true;
  }

  const getTime = (value) => {
    const h = value.getHours().toString().padStart(2, "0");
    const m = value.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`
  }
  const getDate = (value) => {
    const h = value.getHours().toString().padStart(2, "0");
    const m = value.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`
  }

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.container}>
          <Ionicons name="calendar" size={30} color="#8C7871" />
          <CustomText style={styles.text}>{date}</CustomText>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={date}
          onChange={(event, selectedDate) => {
            if (event.type === "set" && selectedDate) {
              setDate(selectedDate);
            } else {
              setShowDatePicker(false);
            }
          }}
        />
      )}

      <TouchableOpacity
        disabled={isTimeDisabled}
        style={{ opacity: isTimeDisabled ? 0 : 1 }}
        onPress={() => setShowTimePicker(true)}
      >
        <View style={styles.container}>
          <Ionicons name="time" size={30} color="#8C7871" />
          <CustomText style={styles.text}>{time}</CustomText>
        </View>
      </TouchableOpacity>

      {showTimePicker && (
        <RNDateTimePicker
          value={time}
          mode="time"
          onChange={(event, selectedTime) => {
            if (event.type === "set" && selectedTime) {
              setTime(selectedTime);
            } else {
              setShowTimePicker(false);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 18,
  },
});
