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

export default function DietEntry({ setEntryData, closeModal }) {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);

  const saveEntry = () => {
    if (calories <= 0 || protein <= 0) {
      alert("Please enter valid data");
      return;
    }
    const newEntry = {
      id: Date.now().toString(),
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomText style={styles.header}>ADD ENTRY</CustomText>

          {/* Calories */}
          <View style={styles.choiceRow}>
            <TouchableOpacity style={{ flex: 2 }}>
              <CustomText style={styles.choiceLabel}>Calories</CustomText>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TextInput
                keyboardType="numeric"
                selectTextOnFocus={true}
                placeholder="0"
                placeholderTextColor="#FBF1E6"
                onChangeText={(text) => setCalories(parseInt(text) || 0)}
                style={styles.input}
                value={calories.toString()}
              />
            </View>
          </View>

          {/* Protein */}
          <View style={styles.choiceRow}>
            <TouchableOpacity style={{ flex: 2 }}>
              <CustomText style={styles.choiceLabel}>Protein</CustomText>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TextInput
                keyboardType="numeric"
                selectTextOnFocus={true}
                placeholder="0"
                placeholderTextColor="#FBF1E6"
                onChangeText={(text) => setProtein(parseInt(text) || 0)}
                style={styles.input}
                value={protein.toString()}
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
