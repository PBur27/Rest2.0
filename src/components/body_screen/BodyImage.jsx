import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyParts } from './BodyParts'

export default function BodyImage() {

  const [organism, setOrganism] = useState({
    front: {
      head: 0,
      traps: 1,
      shoulders: 2,
      chest: 1,
      biceps: 2,
      triceps: 1,
      forearms: 3,
      abs: 2,
      obliques: 0,
      quads: 0,
      calves: 0,
      feet: 0
    },
    back: {
      head: 0,
      traps: 0,
      shoulders: 0,
      triceps: 0,
      forearms: 0,
      rhomboids: 0,
      lats: 0,
      erectorSpinae: 0,
      obliques: 0,
      glutes: 0,
      hamstrings: 0,
      calves: 0,
      feet: 0
    }
  });

  const exertion = {
    0: "#8C7871",
    1: "#A75151",
    2: "#913737",
    3: "#C20000",
  };

  return (
    <View style={styles.bodyContainer}>
      {Object.entries(BodyParts).map(([name, Part]) => (
        <Part
          key={name}
          style={styles.bodyPart}
          fill={exertion[organism.front[name]] || "#8C7871"}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  bodyPart: {
    position: 'absolute',
    top: 0,
  },
})