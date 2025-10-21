import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
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
      <KeyboardAvoidingView style={styles.container}>
        <CustomText style={styles.header}>ADD ENTRY</CustomText>

        <View style={styles.choiceRow}>
          <CustomText style={styles.choiceLabel}>Set Bedtime</CustomText>

          <TouchableOpacity
            style={styles.timeDisplay}
            onPress={() => showTimePicker(true)}
          >
            <CustomText style={styles.timeDisplayText}>
              {formatTime(bedtime)}
            </CustomText>
          </TouchableOpacity>

          {timePicker && (
            <RNDateTimePicker
              value={bedtime instanceof Date ? bedtime : new Date()}
              mode="time"
              onChange={(event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                  setBedtime(selectedDate);
                  showTimePicker(false);
                } else {
                  showTimePicker(false);
                }
              }}
            />
          )}
        </View>

        <View style={styles.choiceRow}>
          <CustomText style={styles.choiceLabel}>Set Hours Slept</CustomText>

          <TextInput
            inputMode="decimal"
            selectTextOnFocus={true}
            scrollEnabled={false}
            textContentType=""
            onChangeText={(text) => setSleepHours(parseFloat(text) || 0)}
            style={styles.input}
          />
        </View>

        <View style={{flex:4}}/>
        {/*save*/}
        <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
          <CustomText style={styles.saveButtonText}>SAVE</CustomText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF1E6",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  header: {
    flex: 1,
    fontSize: 16,
    minHeight:16,
    color: "#8C7871",
  },
  choiceRow: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
  choiceLabel: {
    flex: 2,
    fontSize: 24,
    color: "#8C7871",
  },
  timeDisplay: {
    flex: 1,
    backgroundColor: "#5B4B45",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  timeDisplayText: {
    fontSize: 24,
    backgroundColor: "#5B4B45",
    color: "#FBF1E6",
  },
  input:{
    flex: 1,
    borderRadius: 10,
    fontSize: 24,
    textAlign:"center",
    justifyContent:"flex-end",
    fontFamily: "Bayon_400Regular",
    color: "#FBF1E6",
    backgroundColor: "#5B4B45",
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
