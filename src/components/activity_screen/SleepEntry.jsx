import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
      bedtime,
      sleepHours,
    };

    setEntryData((prev) => ({
      ...prev,
      data: [newEntry],
    }));

    closeModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomText style={styles.header}>ADD ENTRY</CustomText>

          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={{ flex: 2 }}
              onPress={() => showTimePicker(true)}
            >
              <CustomText style={styles.choiceLabel}>Set Bedtime</CustomText>
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => showTimePicker(true)}>
              <CustomText style={styles.timeDisplay}>
                {formatTime(bedtime)}
              </CustomText>
            </TouchableWithoutFeedback>

            {timePicker && (
              <RNDateTimePicker
                value={bedtime instanceof Date ? bedtime : new Date}
                mode="time"
                onChange={(event, selectedDate) => {
                  if (event.type === "set" && selectedDate) {
                    setBedtime(selectedDate);
                  }
                  else{
                    showTimePicker(false)
                  }
                }}
              />
            )}
          </View>

          <View style={styles.choiceRow}>
            <TouchableOpacity style={{ flex: 2 }}>
              <CustomText style={styles.choiceLabel}>
                Set Hours Slept
              </CustomText>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <TextInput
                keyboardType="numeric"
                selectTextOnFocus={true}
                onChangeText={(text) => setSleepHours(parseInt(text) || 0)}
                style={styles.input}
                value={sleepHours.toString()}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
            <CustomText style={styles.saveButtonText}>SAVE</CustomText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "flex-start",
    backgroundColor: "#FBF1E6",
    borderRadius: 10,
    padding: 10,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    color: "#8C7871",
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  choiceLabel: {
    fontSize: 22,
    color: "#8C7871",
  },
  timeDisplay: {
    flex: 1,
    fontSize: 24,
    backgroundColor: "#5B4B45",
    color: "#FBF1E6",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#5B4B45",
    color: "#FBF1E6",
    padding: 8,
    borderRadius: 8,
    fontFamily: "Bayon_400Regular",
    fontSize: 24,
    textAlign: "center",
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#913737",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  saveButtonText: {
    backgroundColor: "#913737",
    fontFamily: "Bayon_400Regular",
    fontSize: 20,
    color: "#FBF1E6",
    textAlign: "center",
  },
});
