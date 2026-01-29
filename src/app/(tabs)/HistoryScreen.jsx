import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar";
import HistoryDayEditModal from "../../components/history_screen/HistoryDayEditModal";
import HistoryDays from "../../components/history_screen/HistoryDays";
import { useUserData } from "../UserDataContext";

export default function HistoryScreen() {
  //userData from context
  const userData = useUserData();
  console.log(userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setmodalData] = useState(null);
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = (data) => {
    setmodalData(data);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display={"History"} />
      <View style={[styles.container, { flex: 13 }]}>
        <HistoryDays userData={userData} openModal={openModal} />
      </View>
      <HistoryDayEditModal
        isVisible={modalVisible}
        onClose={closeModal}
        data={modalData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#8C7871",
    color: "#FBF1E6",
  },
  container: {
    flex: 1,
    backgroundColor: "#FBF1E6",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 5,
    backgroundColor: "#FBF1E6",
  },
});
