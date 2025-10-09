import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../CustomText'
import { TextInput } from 'react-native-web'
import { Ionicons } from '@expo/vector-icons'

export default function ExerciseEntry( date, time ) {

    const [search, setSearch] = useState("")

  return (
    <View style={styles.container}>
      <CustomText>ADD ENTRY</CustomText>
      <View style={styles.searchContainer}>
        <TextInput></TextInput>
        <Ionicons name="search" size={30} color="#FBF1E6" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FBF1E6",
        color: "#8C7871",
    },
    searchContainer:{
        flexDirection: "row",
        height: 200,
    }
})