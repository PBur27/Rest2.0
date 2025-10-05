import { StyleSheet } from "react-native";

export const COLORS = {
  background: {
    primary: "#FBF1E6",
    secondary: "#8C7871",
    alert: "#913737",
  },
  text: {
    primary: "#5B4B45",
    secondary: "#FBF1E6",
    secondary_dim: "#DBD0C6",
  },
  exertion: {
    none: "#8C7871",
    low: "#A75151",
    mid: "#913737",
    high: "#C20000",
  },
};
const { background, text, exertion } = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.primary,
    color: text.primary,
  },
  container_center: {
    flex: 1,
    backgroundColor: background.primary,
    color: text.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  container_secondary: {
    flex: 1,
    backgroundColor: background.secondary,
    color: text.secondary,
  },
  container_center_secondary: {
    flex: 1,
    backgroundColor: background.secondary,
    color: text.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  logo_large: {
    width: 120,
    maxWidth: "80%",
    maxHeight: "80%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  
  top_bar: {
    display: "flex",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 5,
    backgroundColor: background.primary,
  },
  tab_bar: {
    backgroundColor: background.secondary,
    color: text.secondary,
  },
  tab_bar_label: {
    fontFamily: "Bayon_400Regular"
  },
  middle_container: {
    flex: 13,
    backgroundColor: background.primary,
    color: text.primary,
  },
  text: {
    fontFamily: "Bayon_400Regular",
    backgroundColor: background.primary,
    color: text.primary
  },
});
