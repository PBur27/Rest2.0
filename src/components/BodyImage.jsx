import { Text, View, Image } from 'react-native'
import { useState } from 'react'
import { BodyParts } from './BodyParts';
import { styles } from "../styles/styles";

const BodyImage = () => {

  const [organism, setOrganism] = useState({
    front: {
      head: 0,
      traps: 0,
      shoulders: 0,
      chest: 0,
      biceps: 0,
      triceps: 0,
      forearms: 0,
      abs: 0,
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
    <View>
      <Text >Body</Text>
    </View>
  );
}

export default BodyImage