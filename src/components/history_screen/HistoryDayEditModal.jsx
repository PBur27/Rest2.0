import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import CustomText from "../CustomText";



export default function HistoryDayEditModal({ isVisible, onClose, data }) {

  console.log(data)
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
            <Pressable style={styles.entryChoice}>
              <CustomText style={styles.entryChoiceText}>Workout</CustomText>
            </Pressable>
            <Pressable style={styles.entryChoice}>
              <CustomText style={styles.entryChoiceText}>Workout</CustomText>
            </Pressable>
            <Pressable style={styles.entryChoice}>
              <CustomText style={styles.entryChoiceText}>Workout</CustomText>
            </Pressable>


          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal >
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
    width: "70%",
    height: "50%",
    backgroundColor: "#FBF1E6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    gap:20,
    padding:20
  },
  entryChoice: {
    flex: 1,
    width: "80%",
    backgroundColor: "#8C7871"
  },
  entryChoiceText: {
    color: "#FBF1E6"
  }
});
