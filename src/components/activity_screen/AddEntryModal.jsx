import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import DietEntry from "./DietEntry";
import ExerciseEntry from "./ExerciseEntry";
import SleepEntry from "./SleepEntry";

export default function AddEntryModal({ isVisible, onClose, activity, data, setData }) {

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
              {activity === "workout" && (
                <ExerciseEntry data={data} setData={setData} closeModal={onClose} />
              )}
              {activity === "diet" && (
                <DietEntry data={data} setData={setData} closeModal={onClose} />
              )}
              {activity === "sleep" && (
                <SleepEntry data={data} setData={setData} closeModal={onClose} />
              )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000053",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "#FBF1E6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
