import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';

export default function ActivityPicker({ activity, setActivity }) {
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={activity === "diet" ? styles.button_active_left : styles.button} onPress={() => setActivity("diet")}>
        <CustomText style={{ fontSize: 32, color: "#FBF1E6", backgroundColor: "transparent" }} >Meal</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={activity === "workout" ? styles.button_active_middle : styles.button} onPress={() => setActivity("workout")}>
        <CustomText style={{ fontSize: 32, color: "#FBF1E6", backgroundColor: "transparent" }}>Workout</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={activity === "sleep" ? styles.button_active_right : styles.button} onPress={() => setActivity("sleep")}>
        <CustomText style={{ fontSize: 32, color: "#FBF1E6", backgroundColor: "transparent", alignItems: "center" }}>Sleep</CustomText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8C7871",
    color: "#FBF1E6",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#8C7871",
    borderRadius: 10,
  },
  button_active_left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#8C7871",
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    backgroundColor: "#5B4B45",
  },
  button_active_middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#8C7871",
    borderRadius: 20,
    backgroundColor: "#5B4B45",
  },
  button_active_right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#8C7871",
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    backgroundColor: "#5B4B45",
  }
})

