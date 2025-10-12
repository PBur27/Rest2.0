import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../CustomText'
import { TextInput } from 'react-native-web'
import { Ionicons } from '@expo/vector-icons'

export default function ExerciseEntry( date, time ) {

    const [search, setSearch] = useState("")
    
  const exercises = [
    { id: "1", name: "Push Ups" },
    { id: "2", name: "Squats" },
    { id: "3", name: "Burpees" },
    { id: "4", name: "Plank" },
    { id: "5", name: "Jumping Jacks" },
    { id: "6", name: "Lunges" },
    { id: "7", name: "Crunches" },
    { id: "8", name: "Mountain Climbers" },
    { id: "9", name: "Pull Ups" },
    { id: "10", name: "Chin Ups" },
  ];

  return (
    <View style={styles.container}>
      <CustomText>ADD ENTRY</CustomText>
      <View style={styles.searchContainer}>
        <TextInput></TextInput>
        <Ionicons name="search" size={30} color="#FBF1E6" />
      </View>
      <FlatList
        data={exercises}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem}>
            <CustomText>{item.name}</CustomText>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
        backgroundColor: "#FBF1E6",
        color: "#8C7871",
    },
    searchContainer:{
        flexDirection: "row",
        height: 200,
    },
    listItem:{
      flex:1,
    }
})