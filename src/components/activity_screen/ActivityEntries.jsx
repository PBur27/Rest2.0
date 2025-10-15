import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import CustomText from '../CustomText';
import AddEntryModal from './AddEntryModal';

export default function ActivityEntries({ activity, entryData, setData, saveActivity }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const addEntry = () => {
    setModalVisible(true);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <CustomText style={styles.headerText}>Exercise</CustomText>
          <CustomText style={styles.headerText}>Intensity</CustomText>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={entryData.data}
            renderItem={({ item }) => (
              <View style={styles.entryRow}>
                <CustomText style={styles.entryText}>{item.name}</CustomText>
                <CustomText style={styles.entryText}>{item.intensity}</CustomText>
              </View>
            )}
          />

        </View>
        <View style={styles.buttonContainer}>
          {entryData.data.length == 0 ? (
            <TouchableOpacity style={styles.button} onPress={addEntry}>
              <Ionicons name="add" size={80} color="#FBF1E6" />
            </TouchableOpacity>
          )
            :
            (
              <>
                <TouchableOpacity style={styles.button} onPress={addEntry}>
                  <Ionicons name="add" size={80} color="#FBF1E6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={saveActivity}>
                  <Ionicons name="checkmark" size={80} color="#FBF1E6" />
                </TouchableOpacity>
              </>
            )}
        </View>

      </View>
      <AddEntryModal isVisible={modalVisible} onClose={() => setModalVisible(false)} activity={activity} setData={setData} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    flex: 1,
    fontSize: 32,
    backgroundColor: "#913737",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    backgroundColor: "transparent",
    fontSize: 80,
    color: "#FBF1E6",
  },
  headerRow: {
    flex: 1,
    width: "80%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 10,

  },
  listContainer: {
    flex: 19,
    width: "80%",
    justifyContent: "flex-start"
  },
  entryRow: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#5B4B45",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5
  },
  entryText: {
    backgroundColor: "#5B4B45",
    color: "#FBF1E6",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: "80%",
    gap:20,
    marginVertical: 10
  }
})