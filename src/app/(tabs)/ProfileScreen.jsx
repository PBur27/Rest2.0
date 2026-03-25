import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/CustomText";
import TopBar from "../../components/TopBar";
import { useUser } from "../UserDataContext";

export default function ProfileScreen() {
  const userId = useUser();

  const enterDebugRedirect = () => {
    router.replace({
      pathname: "/",
      params: {
        debugId: "testId",
      },
    });
  };
  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <TopBar display={"Account"} />
      <View style={[styles.container, { flex: 13 }]}>
        <CustomText>User Id: {userId}</CustomText>
        {userId == "testId" ? (
          <CustomText>Test data - last week of March</CustomText>
        ) : null}
        <Button
          title="enter debug mode"
          color={"#8C7871"}
          onPress={enterDebugRedirect}
        ></Button>
      </View>
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
