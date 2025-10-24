import { StyleSheet, View } from "react-native";
import SmallLogo from "../components/SmallLogo";
import CustomText from "./CustomText";

export default function TopBar(rightElement) {
  return (
    <View style={styles.topBar}>
      <SmallLogo />
      {typeof rightElement === "string" ? (
        <CustomText>{rightElement}</CustomText>
      ) : (
        <rightElement/>
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
