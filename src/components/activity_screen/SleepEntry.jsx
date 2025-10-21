import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../CustomText";

export default function SleepEntry({ setEntryData, closeModal }) {
  const [bedtime, setBedtime] = useState(new Date());
  const [sleepHours, setSleepHours] = useState(6);
  const [timePicker, showTimePicker] = useState(false);

  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const saveEntry = () => {

    if (!(12 > sleepHours && sleepHours > 3)) {
      alert("Please enter a valid number of hours slept");
      return;
    }
    const newEntry = {
      id: Date.now().toString(),
      bedtime: bedtime,
      sleepHours: sleepHours,
    };

    setEntryData((prev) => ({
      ...prev,
      data: [newEntry],
    }));
    closeModal();
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ flex: 1, fontSize: 24 }}>ADD ENTRY</CustomText>
      <View style={{ flex: 4 }}>
        <View style={[styles.choiceRow, { flex: 1 }]}>
          <TouchableOpacity
            style={{ flex: 2 }}
            onPress={() => showTimePicker(true)}
          >
            <CustomText style={styles.choiceLabel}>Set Bedtime</CustomText>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => showTimePicker(true)}>
            <CustomText
              style={{
                flex: 1,
                fontSize: 24,
                backgroundColor: "#8C7871",
                color: "#FBF1E6",
                padding: 5,
                borderRadius: 5,
              }}
            >
              {formatTime(bedtime)}
            </CustomText>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.choiceRow, { flex: 1 }]}>
          <TouchableOpacity style={{ flex: 2 }}>
            <CustomText style={styles.choiceLabel}>Set Hours Slept</CustomText>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <TextInput
              inputMode="numeric"
              placeholder="6"
              placeholderTextColor={"#FBF1E6"}
              onChangeText={(text) => {
                setSleepHours(parseInt(text));
              }}
              style={{
                backgroundColor: "#8C7871",
                color: "#FBF1E6",
                padding: 5,
                borderRadius: 5,
                fontFamily: "Bayon_400Regular",
                fontSize: 24,
                textAlign: "center",
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
        <CustomText style={styles.saveButtonText}>SAVE</CustomText>
      </TouchableOpacity>

      {timePicker && (
        <RNDateTimePicker
          value={new Date()}
          mode="time"
          display="clock"
          onChange={(event, selectedDate) => {
            showTimePicker(false);
            if (selectedDate) {
              setBedtime(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#FBF1E6",
    color: "#8C7871",
  },
  choiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
    borderRadius: 10,
  },
  choiceText: {
    fontFamily: "Bayon_400Regular",
    fontSize: 16,
  },
  choiceLabel: {
    fontSize: 24,
  },
  saveButton: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#913737",
    borderRadius: 10,
  },
  saveButtonText: {
    fontFamily: "Bayon_400Regular",
    fontSize: 20,
    backgroundColor: "#913737",
    color: "#FBF1E6",
    textAlign: "center",
  },
});
