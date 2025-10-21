import { StyleSheet, Text } from "react-native";

export default function CustomText({ children, ...props }) {
  return (
    <Text
      {...props}
      adjustsFontSizeToFit
      style={[styles.text, props.style]} // allow overrides
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: "Bayon_400Regular",
    backgroundColor: "#FBF1E6",
    color: "#8C7871",
  },
});
