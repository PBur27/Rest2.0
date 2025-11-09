import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";

export default function ActivityDateTime({
  activity,
  dateTime,
  setDateTime
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  let isTimeDisabled = true;

  const getTime = (value) => {
    const h = value.getHours().toString().padStart(2, "0");
    const m = value.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };
  const getDate = (value) => {
    const m = (value.getMonth() + 1).toString().padStart(2, "0");
    const d = value.getDate().toString().padStart(2, "0");
    return `${m}.${d}`;
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.container}>
          <Ionicons name="calendar" size={30} color="#8C7871" />
          <CustomText style={styles.text}>{getDate(dateTime)}</CustomText>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={dateTime}
          onChange={(event, selectedDate) => {
            if (event.type === "set" && selectedDate) {
              setDateTime(selectedDate);
              setShowDatePicker(false);
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
          <CustomText style={styles.text}>{getTime(dateTime)}</CustomText>
        </View>
      </TouchableOpacity>

      {showTimePicker && (
        <RNDateTimePicker
          value={dateTime}
          mode="time"
          onChange={(event, selectedTime) => {
            if (event.type === "set" && selectedTime) {
              setDateTime(selectedTime);
              setShowTimePicker(false);
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
    paddingHorizontal: 20,
    paddingTop:10,
    backgroundColor:"#FBF1E6"
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
