import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../CustomText";
import AddEntryModal from "./AddEntryModal";

export default function ActivityEntries({ activity, data, setData }) {
  // data is an array of entries for the selected activity type
  // activity used for displaying correct fields

  const [modalVisible, setModalVisible] = React.useState(false);
  const addEntry = () => {
    setModalVisible(true);
  };
  const handleDelete = (itemToDelete) => {
    console.log("deleting item: ", itemToDelete);
    setData((data) => data.filter((item) => item !== itemToDelete));
  };

  let headerTextLeft, headerTextRight;

  if (activity == "exercises") {
    headerTextLeft = "exercise";
    headerTextRight = "intensity";
  } else if (activity == "sleep") {
    headerTextLeft = "bedtime";
    headerTextRight = "hours of sleep";
  } else {
    headerTextLeft = "calories";
    headerTextRight = "protein";
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <CustomText
            style={
              data.length === 0
                ? [styles.headerText, { color: "#FBF1E6" }]
                : styles.headerText
            }
          >
            {headerTextLeft}
          </CustomText>
          <CustomText
            style={
              data.length === 0
                ? [styles.headerText, { color: "#FBF1E6" }]
                : styles.headerText
            }
          >
            {headerTextRight}
          </CustomText>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleDelete(item)}>
                <View style={styles.entryRow}>
                  {activity === "exercises" ? (
                    <>
                      <CustomText style={styles.entryText}>
                        {item.name}
                      </CustomText>
                      <CustomText style={styles.entryText}>
                        {item.intensity}
                      </CustomText>
                    </>
                  ) : activity === "sleep" ? (
                    <>
                      <CustomText style={styles.entryText}>
                        {item.bedtime.toTimeString().slice(0, 5)}
                      </CustomText>
                      <CustomText style={styles.entryText}>
                        {item.sleepHours} hrs
                      </CustomText>
                    </>
                  ) : activity === "diet" ? (
                    <>
                      <CustomText style={styles.entryText}>
                        {item.calories} kcal
                      </CustomText>
                      <CustomText style={styles.entryText}>
                        {item.protein} g
                      </CustomText>
                    </>
                  ) : null}
                </View>
              </Pressable>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={addEntry}>
            <Ionicons name="add" size={80} color="#FBF1E6" />
          </TouchableOpacity>
        </View>
      </View>
      <AddEntryModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        activity={activity}
        data={data}
        setData={setData}
      />
    </>
  );
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
    justifyContent: "flex-start",
  },
  entryRow: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#5B4B45",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
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
    gap: 20,
    marginVertical: 10,
  },
});
