import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AddEntryModal from './AddEntryModal'

export default function ActivityEntries({ activity, date, time }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const addEntry = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addEntry}>
        <Ionicons name="add" size={80} color="#FBF1E6" />
      </TouchableOpacity>
      <AddEntryModal isVisible={modalVisible} onClose={() => setModalVisible(false)} activity={activity} date={date} time={time} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flex:"start"
  },
  button: {
    fontSize: 32,
    backgroundColor: "#913737",
    width: "80%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    backgroundColor: "transparent",
    fontSize: 80,
    color: "#FBF1E6",
  }
})