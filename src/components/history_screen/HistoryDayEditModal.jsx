import { router } from "expo-router";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../CustomText";

export default function HistoryDayEditModal({ isVisible, onClose, data }) {
  console.log(data.date);
  const redirectToActivityEdit = (activityType) => {
    const date = data.date.toLocaleDateString('en-CA');
    router.push({
      pathname: "/(tabs)/ActivityScreen",
      params: {
        activityType,
        date,
      },
    });

    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.entryChoice}
              onPress={() => redirectToActivityEdit("workout")}
            >
              <CustomText style={styles.entryChoiceText}>Workout</CustomText>
            </Pressable>

            <Pressable
              style={styles.entryChoice}
              onPress={() => redirectToActivityEdit("diet")}
            >
              <CustomText style={styles.entryChoiceText}>Diet</CustomText>
            </Pressable>

            <Pressable
              style={styles.entryChoice}
              onPress={() => redirectToActivityEdit("sleep")}
            >
              <CustomText style={styles.entryChoiceText}>Sleep</CustomText>
            </Pressable>
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
    width: "60%",
    height: "40%",
    backgroundColor: "#FBF1E6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    gap: 20,
    padding: 20,
  },
  entryChoice: {
    flex: 1,
    width: "80%",
    backgroundColor: "#8C7871",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  entryChoiceText: {
    color: "#FBF1E6",
    height: "100%",
    width: "100%",
    fontSize: 20,
    textAlignVertical: "center",
  },
});
