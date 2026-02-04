import { StyleSheet, View } from "react-native";
import BatteryIcon from "./BatteryIcon";
import CustomText from "./CustomText";
import SmallLogo from "./SmallLogo";

export default function TopBar({ display }) {
  return (
    <View style={styles.topBar}>
      <SmallLogo />
      {display === "battery" ? (
        <BatteryIcon />
      ) : (
        <CustomText>{display}</CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 5,
    backgroundColor: "#FBF1E6",
  },
});
