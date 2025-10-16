import { StyleSheet, TouchableOpacity, View, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import CustomText from '../CustomText'
import { Ionicons } from '@expo/vector-icons'

export default function ExerciseEntry({ setEntryData, closeModal }) {

  const baseExercises = [
    { id: "1", name: "Push Ups" },
    { id: "2", name: "Squats" },
    { id: "9", name: "Pull Ups" },
  ];
  const [exercises, setExercises] = useState(baseExercises);
  const [search, setSearch] = useState("select exercise")
  const [intensity, setIntensity] = useState(5);
  const handleSearch = (text) => {
    setExercises(baseExercises.filter(exercise => exercise.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())));
  }
  const selectExercise = (item) => {
    setSearch(item.name);
  }
  const saveEntry = () => {
    if (!search.trim()) {
      alert("Please select an exercise before saving.");
      return;
    }

    if (isNaN(intensity) || intensity < 1 || intensity > 10) {
      alert("Intensity must be a number between 1 and 10.");
      return;
    }
    const newEntry = {
      id: Date.now().toString(),
      name: search,
      intensity: intensity,
    };

    setEntryData(prev => ({
      ...prev,
      data: [...prev.data, newEntry],
    }));
    closeModal();
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ flex: 1, fontSize: 24 }}>ADD ENTRY</CustomText>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder='search...' placeholderTextColor={"#FBF1E6"} onChangeText={handleSearch} />
      </View>
      <View style={{ flex: 4 }}>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => selectExercise(item)}>
              <CustomText style={styles.listItemText}>{item.name}</CustomText>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.choiceRow}>
        <View style={{ flex: 2 }}>
          <CustomText style={styles.choiceLabel}>Exercise</CustomText>
          <CustomText style={styles.choiceText}>{search}</CustomText>
        </View>
        <View style={{ flex: 1 }}>
          <CustomText style={styles.choiceLabel}>Intensity</CustomText>
          <TextInput style={[styles.choiceText, { padding: 0 }]} placeholder='1-10' maxLength={2} selectTextOnFocus={true} textAlign='center' keyboardType='numeric' placeholderTextColor={"#FBF1E6"} onChangeText={text => setIntensity(Number(text))} />
        </View>

      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveEntry}><CustomText style={styles.saveButtonText}>SAVE</CustomText></TouchableOpacity>
    </View>
  )
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
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#8c7871",
    color: "#FBF1E6",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    color: "#FBF1E6",
    textAlignVertical: "center",
    fontSize: 10,
    fontFamily: "Bayon_400Regular",
  },
  //layout to be fixed on web
  listItem: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
  },
  choiceRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
    backgroundColor: "#5B4B45",
    borderRadius: 10,
  },
  choiceText: {
    fontFamily: "Bayon_400Regular",
    fontSize: 16,
    color: "#FBF1E6",
    backgroundColor: "#5B4B45",
  },
  choiceLabel: {
    height:10,
    fontSize: 8,
    color: "#8c7871",
    backgroundColor: "#5B4B45",
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
})