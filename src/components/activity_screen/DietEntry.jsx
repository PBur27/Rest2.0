import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import CustomText from "../CustomText";

export default function DietEntry({ setEntryData, closeModal, dateTime }) {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);

  const saveEntry = () => {
    if (calories <= 0 || protein <= 0) {
      alert("Please enter valid data");
      return;
    }
    const newEntry = {
      id: dateTime,
      calories,
      protein,
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
      >
        <CustomText style={styles.header}>ADD ENTRY</CustomText>

        <View style={styles.choiceRow}>
          <CustomText style={styles.choiceLabel}>Calories</CustomText>

          <TextInput
            keyboardType="numeric"
            selectTextOnFocus={true}
            onChangeText={(text) => setCalories(parseInt(text) || 0)}
            style={styles.input}
            value={calories.toString()}
          />
        </View>

        <View style={styles.choiceRow}>
          <CustomText style={styles.choiceLabel}>Protein</CustomText>

          <TextInput
            keyboardType="numeric"
            selectTextOnFocus={true}
            onChangeText={(text) => setProtein(parseInt(text) || 0)}
            style={styles.input}
            value={protein.toString()}
          />
        </View>
        <View style={{ flex: 4 }} />
        {/* Save Button */}
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
    backgroundColor: "#5B4B45",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 24,
    lineHeight:24,
    fontFamily: "Bayon_400Regular",
    backgroundColor: "#5B4B45",
    color: "#FBF1E6",
    textAlign: "center"
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

