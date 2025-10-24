import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../CustomText";

export default function ExerciseEntry({ data, setData, closeModal }) {
  const baseExercises = [
    { id: "1", name: "Push Ups" },
    { id: "2", name: "Squats" },
    { id: "9", name: "Pull Ups" },
  ];

  const [exercises, setExercises] = useState(baseExercises);
  const [search, setSearch] = useState("select exercise");
  const [intensity, setIntensity] = useState(5);

  const handleSearch = (text) => {
    setExercises(
      baseExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const selectExercise = (item) => {
    setSearch(item.name);
  };

  const saveEntry = () => {
    if (!search.trim() || search === "select exercise") {
      alert("Please select an exercise before saving.");
      return;
    }

    if (isNaN(intensity) || intensity < 1 || intensity > 10) {
      alert("Intensity must be a number between 1 and 10.");
      return;
    }

    const newEntry = {
      id: new Date().toISOString(),
      name: search,
      intensity: intensity,
    };

    const newData = [...data,newEntry]
    setData(newData)

    closeModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <CustomText style={styles.header}>ADD ENTRY</CustomText>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="search..."
            placeholderTextColor="#FBF1E6"
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.choiceRow}>
          <View style={{ flex: 2 }}>
            <CustomText style={styles.choiceLabel}>Exercise</CustomText>
            <CustomText style={[styles.choiceText, { padding: 0 }]}>
              {search}
            </CustomText>
          </View>
          <View style={{ flex: 1 }}>
            <CustomText style={styles.choiceLabel}>Intensity</CustomText>
            <TextInput
              style={[styles.choiceText, { padding: 0 }]}
              placeholder="1-10"
              maxLength={2}
              selectTextOnFocus={true}
              textAlign="center"
              keyboardType="numeric"
              placeholderTextColor="#FBF1E6"
              onChangeText={(text) => setIntensity(parseInt(text) || 0)}
            />
          </View>
        </View>

        <View style={{ flex: 6 }}>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => selectExercise(item)}
              >
                <CustomText style={styles.listItemText}>{item.name}</CustomText>
              </TouchableOpacity>
            )}
            style={{ flex: 1, width: "100%" }}
          />
        </View>
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
    borderRadius:10,
    gap:10
  },
  header: {
    flex: 1,
    fontSize: 16,
    minHeight:16,
    color: "#8C7871",
  },
  searchContainer: {
    flex: 1,
    width: "100%",
    minHeight: 18,
    flexDirection: "row",
    backgroundColor: "#8C7871",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FBF1E6",
    fontSize: 16,
    lineHeight:16,
    fontFamily: "Bayon_400Regular",
  },
  listItem: {
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: "#8C7871",
  },
  listItemText: {
    fontSize: 16,
    color: "#5B4B45",
    fontFamily: "Bayon_400Regular",
  },
  choiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5B4B45",
    paddingHorizontal:10,
    borderRadius: 10,
  },
  choiceText: {
    fontFamily: "Bayon_400Regular",
    fontSize: 16,
    color: "#FBF1E6",
    backgroundColor: "#5B4B45",
  },
  choiceLabel: {
    fontSize: 10,
    color: "#D3C0B6",
    backgroundColor: "#5B4B45",
  },
  saveButton: {
    flex: 1,
    justifyContent: "center",
    minHeight: 18,
    backgroundColor: "#913737",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  saveButtonText: {
    backgroundColor: "#913737",
    fontFamily: "Bayon_400Regular",
    fontSize: 16,
    color: "#FBF1E6",
  },
});
