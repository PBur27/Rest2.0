import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function AddEntryModal({ isVisible, onClose }) {
  const exercises = [
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
  ];

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
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalContent}>
            <View style={{ flex: 1, margin:10 }}>



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
