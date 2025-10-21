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

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.container}>
          <Ionicons name="calendar" size={30} color="#8C7871" />
          <CustomText style={styles.text}>
            {date.toLocaleDateString()}
          </CustomText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isTimeDisabled}
        style={{ opacity: isTimeDisabled ? 0 : 1 }}
        onPress={() => setShowTimePicker(true)}
      >
        <View style={styles.container}>
          <Ionicons name="time" size={30} color="#8C7871" />
          <CustomText style={styles.text}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </CustomText>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={new Date()}
          maximumDate={new Date()}
          onChange={(event, date) => {
            setDate(date);
            setShowDatePicker(false);
          }}
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          value={new Date()}
          mode="time"
          onChange={(event, date) => {
            setTime(date);
            setShowTimePicker(false);
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
