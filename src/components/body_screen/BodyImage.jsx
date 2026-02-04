import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BodyParts } from "./BodyParts";

export default function BodyImage({ organism }) {
  const [front, setFront] = useState(true);

  const exertion = {
    0: "#8C7871",
    1: "#A75151",
    2: "#913737",
    3: "#C20000",
  };

  return (
    <ScrollView>
      <View style={styles.bodyContainer}>
        {Object.entries(BodyParts).map(([name, Part]) => (
          <Part
            key={name}
            style={styles.bodyPart}
            fill={exertion[organism.front[name]] || "#8C7871"}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bodyPart: {
    position: "absolute",
    top: 0,
  },
});
