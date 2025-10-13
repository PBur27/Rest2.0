import { StyleSheet, TouchableOpacity, View, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import CustomText from '../CustomText'
import { Ionicons } from '@expo/vector-icons'

export default function ExerciseEntry(date, time) {

  const baseExercises = [
    { id: "1", name: "Push Ups" },
    { id: "2", name: "Squats" },
    { id: "3", name: "Burpees" },
    { id: "4", name: "Plank" },
    { id: "5", name: "Jumping Jacks" },
    { id: "6", name: "Lunges" },
    { id: "7", name: "Crunches" },
    { id: "8", name: "Mountain Climbers" },
    { id: "9", name: "Pull Ups" },
    { id: "10", name: "Chin Ups" },
    { id: "11", name: "Sit Ups" },
    { id: "12", name: "High Knees" },
    { id: "13", name: "Butt Kicks" },
    { id: "14", name: "Tricep Dips" },
    { id: "15", name: "Bicep Curls" },
    { id: "16", name: "Shoulder Press" },
    { id: "17", name: "Bench Press" },
    { id: "18", name: "Deadlifts" },
    { id: "19", name: "Bent Over Rows" },
    { id: "20", name: "Leg Press" },
    { id: "21", name: "Calf Raises" },
    { id: "22", name: "Glute Bridges" },
    { id: "23", name: "Russian Twists" },
    { id: "24", name: "Side Plank" },
    { id: "25", name: "Wall Sit" },
    { id: "26", name: "Jump Squats" },
  ];
  const [exercises, setExercises] = useState(baseExercises);
  const [search, setSearch] = useState("")
  const handleSearch = (text) => {
    setExercises(baseExercises.filter(exercise => exercise.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())));
  }
  const selectExercise = (item) => {
    setSearch(item.name);
  }
  const saveEntry = () => {
    console.log(search);
    //logic tobeeadded
  }
  return (
    <View style={styles.container}>
      <CustomText style={{ flex: 1, fontSize: 30 }}>ADD ENTRY</CustomText>
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
          <TextInput style={[styles.choiceText, { padding: 0 }]} defaultValue="5" maxLength={2} selectTextOnFocus={true} textAlign='center' keyboardType='numeric' placeholderTextColor={"#FBF1E6"} />
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
    height: 80,
  },

  searchInput: {
    flex: 3,
    color: "#FBF1E6",
    fontSize: 24,
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
    padding: 10,
    paddingBottom: 0,
    backgroundColor: "#5B4B45",
    borderRadius: 10,
  },
  choiceText: {
    fontFamily: "Bayon_400Regular",
    fontSize: 20,
    color: "#FBF1E6",
    backgroundColor: "#5B4B45",
  },
  choiceLabel: {
    fontSize: 10,
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