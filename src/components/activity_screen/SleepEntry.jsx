import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";

export default function SleepEntry({ setEntryData, closeModal }) {
  const [bedtime, setBedtime] = useState(new Date());
  const [sleepHours, setSleepHours] = useState(0);
  let bedtimeStateHasChanged = false;

  const [timePicker, showTimePicker] = useState(false);

  useEffect(() => {
    bedtimeStateHasChanged = true;
  }, [bedtime]);

  const saveEntry = () => {
    if (bedtimeStateHasChanged == false) {
      alert("Please enter a valid bedtime");
      return;
    }

    if (sleepHours == 0) {
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
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={[styles.choiceRow, { flex: 1 }]}>
          <TouchableOpacity style={{ flex: 2 }}>
            <CustomText style={styles.choiceLabel}>Set Hours Slept</CustomText>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Picker
            selectedValue={sleepHours}
            onValueChange={(itemValue, itemIndex) => setSleepHours(itemValue)}
          >
            <Picker.Item label="J" value="java" />
            <Picker.Item label="K" value="js" />
          </Picker>
          </View>
        </View>
        <View style={{ flex: 1 }}/>
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
          onChange={(date) => {
            setBedtime(date);
            showTimePicker(false);
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
