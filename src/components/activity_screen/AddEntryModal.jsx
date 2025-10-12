import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import ExerciseEntry from "./ExerciseEntry";

export default function AddEntryModal({ isVisible, onClose, activity, date, time }) {

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose} // close on background press
      >
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={styles.modalContent}>
            <View style={{ flex: 1, margin: 10 }}>
              {activity === "workout" && (
                <ExerciseEntry date={date} time={time} />
              )}
              {activity === "diet" && (
                <DietEntry date={date} time={time} />
              )}
              {activity === "sleep" && (
                <Entry date={date} time={time} />
              )}


            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000060",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "#FBF1E6",
    opacity: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
